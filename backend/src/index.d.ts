import { UserJWTData } from "./models";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
