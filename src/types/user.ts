export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";

export interface User {
  id: number;
  name?: string;
  email: string;
  role: Role;
}
