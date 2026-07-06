import { Schema, model, Types } from 'mongoose';
import { Role } from '@fln/shared';

const userScopeSchema = new Schema(
  {
    stateId: { type: Types.ObjectId, ref: 'State', required: false },
    districtId: { type: Types.ObjectId, ref: 'District', required: false },
    blockId: { type: Types.ObjectId, ref: 'Block', required: false },
    schoolId: { type: Types.ObjectId, ref: 'School', required: false },
    classId: { type: Types.ObjectId, ref: 'Class', required: false },
    assignedSchoolIds: [{ type: Types.ObjectId, ref: 'School' }],
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, trim: true },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
    scope: { type: userScopeSchema, default: () => ({}) },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

userSchema.index({ role: 1, 'scope.stateId': 1, 'scope.districtId': 1, 'scope.blockId': 1 });

export const User = model('User', userSchema);