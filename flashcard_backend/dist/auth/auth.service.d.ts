import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    validateUser(username: string, password: string): Promise<any>;
    login(username: string, password: string): Promise<{
        message: string;
        user: any;
    }>;
}
