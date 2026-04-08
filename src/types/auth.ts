import type { Plan } from "@prisma/client";
import type { Session, User } from "next-auth";

export interface ExtendedUser extends User {
  id: string;
  plan: Plan;
  credits: number;
}

export interface ExtendedSession extends Session {
  user: ExtendedUser;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    plan?: Plan;
    credits?: number;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    plan: Plan;
    credits: number;
  }
}
