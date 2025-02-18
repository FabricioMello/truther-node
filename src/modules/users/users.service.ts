import {Inject, Injectable} from '@nestjs/common';
import {getRepositoryToken} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/models/User';
import { IUserService } from './users.service.interface';
import { UserDto } from '../../dtos/user.dto';
import { UserRequest } from './requests/UserRequest';
import { UpdateUserRequest } from './requests/UpdateUserRequest';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(getRepositoryToken(User))
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find();
        return users.map(user => this.toUserDto(user));
    }

    async findOne(id: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOneBy({ id });
        return user ? this.toUserDto(user) : null;
    }

    async createUser(user: UserRequest): Promise<UserDto> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.userRepository.save({ ...user, password: hashedPassword });
        return this.toUserDto(newUser);
    }

    async updateUser(id: string, user: UpdateUserRequest): Promise<UserDto | null> {
        const { password, ...updateUser } = user;
        await this.userRepository.update(id, updateUser);
        const updatedUser = await this.findOne(id);
        return updatedUser;
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    private toUserDto(user: User): { id: string; name: string; email: string; role: string } {
        const { id, name, email, role } = user;
        return { id, name, email, role };
    }
}