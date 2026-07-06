// v0.2.0 - Role enum + shared types for backend + frontend.

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  STATE_ADMIN = 'STATE_ADMIN',
  DISTRICT_ADMIN = 'DISTRICT_ADMIN',
  BLOCK_ADMIN = 'BLOCK_ADMIN',
  PRINCIPAL = 'PRINCIPAL',
  TEACHER = 'TEACHER',
  VOLUNTEER = 'VOLUNTEER',
}

export interface IUserScope {
  stateId?: string;
  districtId?: string;
  blockId?: string;
  schoolId?: string;
  classId?: string;
  assignedSchoolIds?: string[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  passwordHash?: string;
  phone?: string;
  role: Role;
  scope: IUserScope;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IAuthUser {
  _id: string;
  name: string;
  email: string;
  role: Role;
  scope: IUserScope;
}

export interface IAuthResponse {
  token: string;
  refreshToken: string;
  user: IAuthUser;
}

export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const SHARED_PACKAGE_VERSION = '0.2.0';