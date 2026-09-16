import { PrismaClient, Role, SubscriptionStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting NextLaunch Database Seeder...');

  // 1. Create/Upsert Founder User (Alex Rivera)
  const founder = await prisma.user.upsert({
    where: { email: 'alex@devpreflight.com' },
    update: {
      name: 'Alex Rivera',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
    },
    create: {
      id: 'usr_demo_founder_01',
      name: 'Alex Rivera',
      email: 'alex@devpreflight.com',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
    },
  });
  console.log(`✅ Upserted Founder User: ${founder.name} (${founder.email})`);

  // 2. Create Team Members
  const engineer = await prisma.user.upsert({
    where: { email: 'sarah.chen@devpreflight.com' },
    update: {
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop&crop=face',
    },
    create: {
      name: 'Sarah Chen',
      email: 'sarah.chen@devpreflight.com',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop&crop=face',
    },
  });

  const designer = await prisma.user.upsert({
    where: { email: 'marcus.vance@devpreflight.com' },
    update: {
      name: 'Marcus Vance',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    },
    create: {
      name: 'Marcus Vance',
      email: 'marcus.vance@devpreflight.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    },
  });

  // 3. Create Demo Workspace (Acme Cloud Platform)
  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 30);

  const workspace = await prisma.workspace.upsert({
    where: { slug: 'ws_demo_cloud_01' },
    update: {
      name: 'Acme Cloud Platform',
      plan: 'pro',
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      currentPeriodEnd: nextMonth,
      polarCustomerId: 'pol_cust_demo_88921',
      polarSubscriptionId: 'sub_polar_demo_99212',
    },
    create: {
      id: 'ws_demo_cloud_01',
      name: 'Acme Cloud Platform',
      slug: 'ws_demo_cloud_01',
      plan: 'pro',
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      currentPeriodEnd: nextMonth,
      polarCustomerId: 'pol_cust_demo_88921',
      polarSubscriptionId: 'sub_polar_demo_99212',
    },
  });
  console.log(`✅ Upserted Workspace: ${workspace.name} (Slug: ${workspace.slug})`);

  // 4. Attach Memberships
  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: founder.id,
      },
    },
    update: { role: Role.OWNER },
    create: {
      workspaceId: workspace.id,
      userId: founder.id,
      role: Role.OWNER,
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: engineer.id,
      },
    },
    update: { role: Role.ADMIN },
    create: {
      workspaceId: workspace.id,
      userId: engineer.id,
      role: Role.ADMIN,
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: designer.id,
      },
    },
    update: { role: Role.MEMBER },
    create: {
      workspaceId: workspace.id,
      userId: designer.id,
      role: Role.MEMBER,
    },
  });
  console.log('✅ Created Workspace Members (Owner, Admin, Member)');

  // 5. Create Sample Api Key
  await prisma.apiKey.upsert({
    where: { keyHash: 'nl_live_hash_demo_secret_token_123' },
    update: {},
    create: {
      workspaceId: workspace.id,
      name: 'Production Ingestion API Key',
      keyHash: 'nl_live_hash_demo_secret_token_123',
      prefix: 'nl_live_99a8',
      lastUsedAt: new Date(),
    },
  });

  // 6. Create Sample Webhook Audit Logs
  await prisma.webhookEvent.upsert({
    where: { eventId: 'evt_polar_checkout_completed_sample' },
    update: { processedAt: new Date() },
    create: {
      eventId: 'evt_polar_checkout_completed_sample',
      eventType: 'checkout.created',
      payload: {
        type: 'checkout.created',
        data: {
          customer_id: 'pol_cust_demo_88921',
          status: 'confirmed',
          product_name: 'NextLaunch Pro Plan',
          amount: 10900,
          currency: 'usd',
        },
      },
    },
  });

  console.log('\n🎉 NextLaunch Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeder error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
