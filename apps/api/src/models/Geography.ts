import { Schema, model, Types } from 'mongoose';

const stateSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const State = model('State', stateSchema);

const districtSchema = new Schema(
  {
    stateId: { type: Types.ObjectId, ref: 'State', required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
districtSchema.index({ stateId: 1, code: 1 }, { unique: true });
export const District = model('District', districtSchema);

const blockSchema = new Schema(
  {
    districtId: { type: Types.ObjectId, ref: 'District', required: true, index: true },
    stateId: { type: Types.ObjectId, ref: 'State', required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
blockSchema.index({ districtId: 1, code: 1 }, { unique: true });
export const Block = model('Block', blockSchema);

const schoolSchema = new Schema(
  {
    blockId: { type: Types.ObjectId, ref: 'Block', required: true, index: true },
    districtId: { type: Types.ObjectId, ref: 'District', required: true, index: true },
    stateId: { type: Types.ObjectId, ref: 'State', required: true, index: true },
    name: { type: String, required: true, trim: true },
    udiseCode: { type: String, unique: true, sparse: true, trim: true },
    address: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
export const School = model('School', schoolSchema);

const classSchema = new Schema(
  {
    schoolId: { type: Types.ObjectId, ref: 'School', required: true, index: true },
    grade: { type: Number, required: true, min: 1, max: 5 },
    section: { type: String, required: true, uppercase: true, trim: true },
    classTeacherId: { type: Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
classSchema.index({ schoolId: 1, grade: 1, section: 1 }, { unique: true });
export const Class = model('Class', classSchema);

const studentSchema = new Schema(
  {
    classId: { type: Types.ObjectId, ref: 'Class', required: true, index: true },
    schoolId: { type: Types.ObjectId, ref: 'School', required: true, index: true },
    blockId: { type: Types.ObjectId, ref: 'Block', required: true },
    districtId: { type: Types.ObjectId, ref: 'District', required: true },
    stateId: { type: Types.ObjectId, ref: 'State', required: true },
    name: { type: String, required: true, trim: true },
    rollNo: { type: Number, required: true },
    dob: { type: Date },
    gender: { type: String, enum: ['M', 'F', 'O'] },
    parentName: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
studentSchema.index({ classId: 1, rollNo: 1 }, { unique: true });
export const Student = model('Student', studentSchema);