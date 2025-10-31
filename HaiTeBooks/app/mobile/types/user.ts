export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  full_name: string;
  address: string;
  phone?: string; // Thêm phone nếu cần
  role_id: "user" | "admin";
}
