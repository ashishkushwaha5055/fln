import type { Role, IUserScope } from '@fln/shared';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        role: Role;
        scope: IUserScope;
      };
    }
  }
}

export {};