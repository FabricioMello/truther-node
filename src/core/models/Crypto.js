"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const typeorm_1 = require("typeorm");
let Crypto = class Crypto {
};
exports.Crypto = Crypto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Crypto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Crypto.prototype, "marketCap", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Crypto.prototype, "variation24h", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Crypto.prototype, "variation7d", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Object)
], Crypto.prototype, "allTimeHigh", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Crypto.prototype, "allTimeLow", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Crypto.prototype, "currentValue", void 0);
exports.Crypto = Crypto = __decorate([
    (0, typeorm_1.Entity)()
], Crypto);
