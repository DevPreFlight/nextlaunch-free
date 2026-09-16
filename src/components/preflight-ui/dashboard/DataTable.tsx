'use client';

import React, { useState, useMemo } from 'react';
import { StatusBadge } from './StatusBadge';
import { StatusType } from '../types';

export interface DataColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: DataColumn<T>[];
  pageSize?: number;
  pageSizeOptions?: number[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  filterOptions?: { label: string; value: string; filterFn: (item: T) => boolean }[];
  isLoading?: boolean;
  emptyMessage?: React.ReactNode;
  tableAriaLabel?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize: initialPageSize = 5,
  pageSizeOptions = [5, 10, 25, 50],
  searchPlaceholder = 'Search records...',
  searchKey,
  filterOptions,
  isLoading = false,
  emptyMessage = 'No matching records found.',
  tableAriaLabel = 'Data table',
  className = '',
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Filtered and Sorted records
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search query filter
    if (searchQuery.trim() && searchKey) {
      const q = searchQuery.toLowerCase();
      result = result.filter((item) =>
        String(item[searchKey] || '')
          .toLowerCase()
          .includes(q)
      );
    }

    // Filter Options
    if (selectedFilter !== 'all' && filterOptions) {
      const activeOpt = filterOptions.find((opt) => opt.value === selectedFilter);
      if (activeOpt) {
        result = result.filter(activeOpt.filterFn);
      }
    }

    // Sorting
    if (sortKey) {
      result.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA === valB) return 0;
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, searchKey, selectedFilter, filterOptions, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedFilter('all');
    setCurrentPage(1);
  };

  return (
    <div
      className={`w-full bg-white rounded-xl border border-slate-300/80 shadow-xs overflow-hidden ${className}`}
      role="region"
      aria-label={tableAriaLabel}
    >
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Showing ${filteredData.length} of ${data.length} records. Page ${currentPage} of ${totalPages}.`}
      </div>

      {/* Top Controls: Search & Filter Tabs */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/70">
        {/* Search Input with 1-Click Clear */}
        <div className="relative w-full sm:w-72">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSearchQuery('');
                setCurrentPage(1);
              }
            }}
            className="w-full text-xs pl-9 pr-8 py-2 rounded-lg bg-white border border-slate-300 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 placeholder:text-slate-400 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              aria-label="Clear search text"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        {filterOptions && (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => {
                setSelectedFilter('all');
                setCurrentPage(1);
              }}
              aria-pressed={selectedFilter === 'all'}
              className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all cursor-pointer shrink-0 ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-300'
              }`}
            >
              All ({data.length})
            </button>
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setSelectedFilter(opt.value);
                  setCurrentPage(1);
                }}
                aria-pressed={selectedFilter === opt.value}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all cursor-pointer shrink-0 ${
                  selectedFilter === opt.value
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Scrollable table container">
        <table className="w-full min-w-[520px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-600 uppercase tracking-wider">
              {columns.map((col, idx) => {
                const isSorted = sortKey === col.key;
                const ariaSortVal = col.sortable
                  ? isSorted
                    ? sortDirection === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                  : undefined;

                return (
                  <th
                    key={idx}
                    scope="col"
                    role="columnheader"
                    aria-sort={ariaSortVal}
                    tabIndex={col.sortable ? 0 : undefined}
                    style={{ width: col.width }}
                    className={`p-3.5 select-none ${
                      col.align === 'right'
                        ? 'text-right'
                        : col.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                    } ${
                      col.sortable
                        ? 'cursor-pointer hover:text-slate-900 hover:bg-slate-100/80 focus:outline-none focus:bg-slate-100 focus:text-slate-900 focus:ring-1 focus:ring-blue-600'
                        : ''
                    }`}
                    onClick={() => col.sortable && handleSort(String(col.key))}
                    onKeyDown={(e) => {
                      if (col.sortable && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleSort(String(col.key));
                      }
                    }}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        col.align === 'right' ? 'justify-end' : ''
                      }`}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span
                          className={`text-xs ${
                            isSorted ? 'text-blue-600 font-bold' : 'text-slate-400'
                          }`}
                          aria-hidden="true"
                        >
                          {isSorted ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-slate-500">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Loading records...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50/80 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`p-3.5 text-slate-700 ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      }`}
                    >
                      {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center">
                  <div className="space-y-2 max-w-sm mx-auto">
                    <p className="text-xs font-medium text-slate-500">{emptyMessage}</p>
                    {(searchQuery || selectedFilter !== 'all') && (
                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200"
                      >
                        Reset search &amp; filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 bg-slate-50/70">
        <div className="flex items-center gap-3">
          <span>
            Showing <strong className="text-slate-900">{filteredData.length ? (currentPage - 1) * pageSize + 1 : 0}</strong> to{' '}
            <strong className="text-slate-900">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </strong>{' '}
            of <strong className="text-slate-900">{filteredData.length}</strong> results
          </span>

          {/* Page Size Selector */}
          {pageSizeOptions && pageSizeOptions.length > 1 && (
            <div className="hidden sm:flex items-center gap-1.5">
              <label htmlFor="datatable-page-size" className="text-slate-500">
                Per page:
              </label>
              <select
                id="datatable-page-size"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="text-xs bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                {pageSizeOptions.map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <nav aria-label="Pagination Navigation" className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer font-medium transition-colors"
          >
            Prev
          </button>
          <span className="px-2 text-xs font-bold text-slate-900" aria-current="page">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer font-medium transition-colors"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
