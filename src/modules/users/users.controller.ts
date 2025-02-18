import { Controller, Get, Post, Put, Delete, Param, Body, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IUserService } from './users.service.interface';
import {UserRequest} from "./requests/UserRequest";
import {UpdateUserRequest} from "./requests/UpdateUserRequest";
import {UserDto} from "../../dtos/user.dto";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        @Inject('IUserService')
        private readonly userService: IUserService,
    ) {}

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users.' })
    @Get()
    async findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'Return a single user.' })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserDto | null> {
        return this.userService.findOne(id);
    }

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @Post()
    async createUser(@Body() createUserRequest: UserRequest): Promise<UserDto> {
        return this.userService.createUser(createUserRequest);
    }

    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserRequest: UpdateUserRequest): Promise<UserDto | null> {
        return this.userService.updateUser(id, updateUserRequest);
    }

    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}