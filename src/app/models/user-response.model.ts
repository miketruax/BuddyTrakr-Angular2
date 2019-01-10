import { User } from "./user.model";

//User Response
export interface UserResponse{
    err?: string,
    user?: User,
    token?: string
}