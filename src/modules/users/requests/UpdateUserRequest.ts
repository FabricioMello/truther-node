import { PartialType } from '@nestjs/swagger';
import {UserRequest} from "./UserRequest";

export class UpdateUserRequest extends PartialType(UserRequest) {}