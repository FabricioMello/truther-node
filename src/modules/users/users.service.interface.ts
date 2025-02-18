import { User } from '../../core/models/User';
import {UserDto} from "../../dtos/user.dto";
import {UserRequest} from "./requests/UserRequest";
import {UpdateUserRequest} from "./requests/UpdateUserRequest";

export interface IUserService {
    findAll(): Promise<UserDto[]>;
    findOne(id: string): Promise<UserDto | null>;
    createUser(user: UserRequest): Promise<UserDto>;
    updateUser(id: string, user: UpdateUserRequest): Promise<UserDto | null>;
    deleteUser(id: string): Promise<void>;
}