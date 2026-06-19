import { JwtPayload } from "jsonwebtoken";
import { Role } from "generated/prisma/enums.js";

export interface AppJwtPayload extends JwtPayload {
  user_id: number;
  role: Role;
}