//User store
export interface User{
  _id?: string;
  username?: string;
  friends?: Array<string>;
  email?: string;
  password?: string;
  role?: string;
}
