import type { Session, User } from "@raypx/auth/client";
import type { Database } from "@raypx/db";

export type ServerOptions = {
  prefix: string;
};

export type Variables = {
  db: Database;
  session?: Session;
  user?: User;
};
