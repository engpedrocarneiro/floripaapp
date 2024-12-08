export interface AuthUser {
    id: string;
    email: string;
    created_at: string;
  }
  
  export interface SignUpCredentials {
    email: string;
    password: string;
    name?: string;
  }
  
  export interface SignInCredentials {
    email: string;
    password: string;
  }