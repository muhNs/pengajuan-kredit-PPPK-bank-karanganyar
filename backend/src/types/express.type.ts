import type { AppJwtPayload } from "./jwt.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: AppJwtPayload;
    }
  }
}

export {};