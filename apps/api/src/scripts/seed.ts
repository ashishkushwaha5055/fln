// v0.2.0 - Minimal seed: 1 state, 1 school, 2 classes, 7 test users (one per role).
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { State, District, Block, School, Class } from '../models/Geography.js';
import { User } from '../models/User.js';
import { Role } from '@fln/shared';
import 'dotenv/config';

async function clearAll() {
  console.log('🧹 Clearing existing data...');
  await Promise.all([
    User.deleteMany({}),
    State.deleteMany({}),
    District.deleteMany({}),
    Block.deleteMany({}),
    School.deleteMany({}),
    Class.deleteMany({}),
  ]);
}

async function seedGeography() {
  console.log('🌍 Seeding geography (State → District → Block → School → Class)...');
  const state = await State.create({ name: 'Madhya Pradesh', code: 'MP' });
  const district = await District.create({
    stateId: state._id,
    name: 'Bhopal',
    code: 'BPL',
  });
  const block = await Block.create({
    stateId: state._id,
    districtId: district._id,
    name: 'Phanda Block',
    code: 'PHN',
  });
  const school = await School.create({
    stateId: state._id,
    districtId: district._id,
    blockId: block._id,
    name: 'Government Primary School Phanda',
    udiseCode: '23230100101',
    address: 'Phanda, Bhopal, MP',
  });
  const classA = await Class.create({ schoolId: school._id, grade: 2, section: 'A' });
  const classB = await Class.create({ schoolId: school._id, grade: 2, section: 'B' });
  return { state, district, block, school, classA, classB };
}

async function seedUsers(ctx: Awaited<ReturnType<typeof seedGeography>>) {
  console.log('👥 Seeding users (7 roles)...');
  const password = 'Test@123';
  const hash = await bcrypt.hash(password, 10);

  const users = [
    { name: 'Super Admin', email: 'super@fln.gov.in', role: Role.SUPER_ADMIN, scope: {} },
    { name: 'MP State Admin', email: 'state@fln.gov.in', role: Role.STATE_ADMIN, scope: { stateId: ctx.state._id.toString() } },
    { name: 'Bhopal District Admin', email: 'district@fln.gov.in', role: Role.DISTRICT_ADMIN, scope: { stateId: ctx.state._id.toString(), districtId: ctx.district._id.toString() } },
    { name: 'Phanda Block Admin', email: 'block@fln.gov.in', role: Role.BLOCK_ADMIN, scope: { stateId: ctx.state._id.toString(), districtId: ctx.district._id.toString(), blockId: ctx.block._id.toString() } },
    { name: 'Principal Sharma', email: 'principal@fln.gov.in', role: Role.PRINCIPAL, scope: { stateId: ctx.state._id.toString(), districtId: ctx.district._id.toString(), blockId: ctx.block._id.toString(), schoolId: ctx.school._id.toString() } },
    { name: 'Teacher Verma', email: 'teacher@fln.gov.in', role: Role.TEACHER, scope: { stateId: ctx.state._id.toString(), districtId: ctx.district._id.toString(), blockId: ctx.block._id.toString(), schoolId: ctx.school._id.toString(), classId: ctx.classA._id.toString() } },
    { name: 'Volunteer Singh', email: 'volunteer@fln.gov.in', role: Role.VOLUNTEER, scope: { stateId: ctx.state._id.toString(), districtId: ctx.district._id.toString(), blockId: ctx.block._id.toString(), assignedSchoolIds: [ctx.school._id.toString()] } },
  ];

  for (const u of users) {
    await User.create({
      name: u.name,
      email: u.email,
      passwordHash: hash,
      role: u.role,
      scope: u.scope,
      isActive: true,
    });
    console.log(`   ✅ ${u.role.padEnd(15)} - ${u.email}`);
  }
  return password;
}

async function main() {
  try {
    console.log('🚀 Starting seed...\n');
    await connectDB();
    await clearAll();
    const ctx = await seedGeography();
    const password = await seedUsers(ctx);

    console.log('\n🎉 Seed complete!');
    console.log('\n📋 LOGIN CREDENTIALS (password for all: Test@123)');
    console.log('═══════════════════════════════════════════════════');
    console.log('   SUPER_ADMIN    super@fln.gov.in');
    console.log('   STATE_ADMIN    state@fln.gov.in');
    console.log('   DISTRICT_ADMIN district@fln.gov.in');
    console.log('   BLOCK_ADMIN    block@fln.gov.in');
    console.log('   PRINCIPAL      principal@fln.gov.in');
    console.log('   TEACHER        teacher@fln.gov.in');
    console.log('   VOLUNTEER      volunteer@fln.gov.in');
    console.log('═══════════════════════════════════════════════════');
    console.log(`   Password for ALL: ${password}`);
    console.log('═══════════════════════════════════════════════════\n');
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

main();