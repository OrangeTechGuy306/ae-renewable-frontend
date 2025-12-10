// User types
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'engineer' | 'viewer';
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  role?: 'admin' | 'engineer' | 'viewer';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface UpdateProfileData {
  full_name?: string;
  email?: string;
}

export interface UpdatePasswordData {
  current_password: string;
  new_password: string;
}
