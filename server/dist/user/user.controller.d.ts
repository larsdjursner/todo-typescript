import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserById(id: string): Promise<UserModel>;
    getUsers(): Promise<UserModel[]>;
    createUser(userData: UserModel): Promise<UserModel>;
    updateUser(id: string, userData: any): Promise<UserModel>;
    deleteUser(id: string): Promise<UserModel>;
}
