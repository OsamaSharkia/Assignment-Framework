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
exports.FlashcardSetDto = void 0;
const class_validator_1 = require("class-validator");
const flashcard_dto_1 = require("./flashcard.dto");
const comment_dto_1 = require("./comment.dto");
const swagger_1 = require("@nestjs/swagger");
class FlashcardSetDto {
}
exports.FlashcardSetDto = FlashcardSetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The name of the flashcard set' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlashcardSetDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [flashcard_dto_1.FlashCardDto], description: 'List of flashcards in the set' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], FlashcardSetDto.prototype, "cards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [comment_dto_1.CommentDto], description: 'List of comments for the flashcard set', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], FlashcardSetDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp of when the set was created' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], FlashcardSetDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp of the last update to the set' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], FlashcardSetDto.prototype, "updated_at", void 0);
//# sourceMappingURL=flashcard-set.dto.js.map