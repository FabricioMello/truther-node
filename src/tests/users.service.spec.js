"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_service_1 = require("../modules/users/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../core/models/User");
const typeorm_2 = require("typeorm");
describe('UsersService', () => {
    let service;
    let repository;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                users_service_1.UsersService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(User_1.User),
                    useClass: typeorm_2.Repository,
                },
            ],
        }).compile();
        service = module.get(users_service_1.UsersService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(User_1.User));
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    // Add more tests here
});
