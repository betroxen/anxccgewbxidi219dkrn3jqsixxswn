export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
