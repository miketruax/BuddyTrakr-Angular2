//User Model
export interface User{
  id?: string;
  username?: string;
  friends?: Array<string>;
  email?: string;
  password?: string;
  role?: string;
}
