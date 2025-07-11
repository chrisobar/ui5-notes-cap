import { User } from "passport";

declare global {
  namespace Express {
    interface User {
      id: string;
      displayName: string;
      email: string;
    }
    interface ODataSession {
      redirectTo: undefined | string | string[] | ParsedQs | ParsedQs[];
    }
    interface Request {
      user: User;
      session: ODataSession;
      logout(callback: (err: Error | null) => void): void;
    }
  }
}
