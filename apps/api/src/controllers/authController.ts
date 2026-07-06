import { Types } from 'mongoose';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../middlewares/auth.js';
import { Role, type IUserScope, type IApiResponse, type IAuthResponse } from '@fln/shared';
import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 8;

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: Role;
  scope: IUserScope;
}

function toScopeString(scope: any): IUserScope {
  return {
    stateId: scope?.stateId?.toString(),
    districtId: scope?.districtId?.toString(),
    blockId: scope?.blockId?.toString(),
    schoolId: scope?.schoolId?.toString(),
    classId: scope?.classId?.toString(),
    assignedSchoolIds: scope?.assignedSchoolIds?.map((id: any) => id.toString()),
  };
}

function buildAuthResponse(user: {
  _id: any;
  name: string;
  email: string;
  role: string;
  scope: any;
}): IApiResponse<IAuthResponse> {
  const scopeObj = toScopeString(user.scope);
  const userIdStr = user._id.toString();
  const roleEnum = user.role as Role;
  return {
    success: true,
    message: 'Login successful',
    data: {
      token: generateAccessToken({ userId: userIdStr, role: roleEnum, scope: scopeObj }),
      refreshToken: generateRefreshToken({ userId: userIdStr }),
      user: {
        _id: userIdStr,
        name: user.name,
        email: user.email,
        role: roleEnum,
        scope: scopeObj,
      },
    },
  };
}

export async function registerUser(input: RegisterInput): Promise<IApiResponse<IAuthResponse>> {
  const existing = await User.findOne({ email: input.email.toLowerCase() })
    .select('_id')
    .lean();
  if (existing) {
    throw new ApiError(409, 'User with this email already exists');
  }

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

  const user = await User.create({
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash,
    phone: input.phone,
    role: input.role,
    scope: input.scope,
  });

  return buildAuthResponse(user);
}

export async function loginUser(
  email: string,
  password: string,
): Promise<IApiResponse<IAuthResponse>> {
  const user = await User.findOne({ email: email.toLowerCase() }).lean();
  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const ok = await bcrypt.compare(password, user.passwordHash as string);
  if (!ok) {
    throw new ApiError(401, 'Invalid credentials');
  }

  return buildAuthResponse(user);
}

export async function getCurrentUser(
  reqUser: { _id: string; role: Role; scope: IUserScope },
): Promise<IApiResponse<{ _id: string; role: Role; scope: IUserScope; name: string; email: string }>> {
  return {
    success: true,
    message: 'User fetched (from token)',
    data: {
      _id: reqUser._id,
      role: reqUser.role,
      scope: reqUser.scope,
      name: '',
      email: '',
    },
  };
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<IApiResponse<{ token: string }>> {
  if (!refreshToken) throw new ApiError(401, 'Refresh token required');
  let decoded: { userId: string };
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const user = await User.findById(decoded.userId).select('role scope isActive').lean();
  if (!user || !user.isActive) throw new ApiError(401, 'Invalid refresh token');

  const scopeObj = toScopeString(user.scope);
  const token = generateAccessToken({
    userId: decoded.userId,
    role: user.role as Role,
    scope: scopeObj,
  });
  return { success: true, message: 'Token refreshed', data: { token } };
}

export function validateObjectId(id: string, name = 'id'): void {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid ${name}`);
  }
}