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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardsController = void 0;
const common_1 = require("@nestjs/common");
const flashcards_service_1 = require("./flashcards.service");
const flashcard_set_dto_1 = require("./dto/flashcard-set.dto");
const flashcard_dto_1 = require("./dto/flashcard.dto");
let FlashcardsController = class FlashcardsController {
    constructor(flashcardsService) {
        this.flashcardsService = flashcardsService;
    }
    async getAllSets() {
        return await this.flashcardsService.findAllSets();
    }
    async getSetById(setId) {
        return await this.flashcardsService.findSetById(setId);
    }
    async createSet(setDto) {
        return await this.flashcardsService.createSet(setDto);
    }
    async updateSetById(setId, setDto) {
        return await this.flashcardsService.updateSetById(setId, setDto);
    }
    async deleteSetById(setId) {
        return await this.flashcardsService.deleteSetById(setId);
    }
    async addFlashcard(setId, createFlashcardDto) {
        return await this.flashcardsService.addFlashcard(setId, createFlashcardDto);
    }
};
exports.FlashcardsController = FlashcardsController;
__decorate([
    (0, common_1.Get)('/sets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlashcardsController.prototype, "getAllSets", null);
__decorate([
    (0, common_1.Get)('/sets/:setId'),
    __param(0, (0, common_1.Param)('setId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FlashcardsController.prototype, "getSetById", null);
__decorate([
    (0, common_1.Post)('/sets'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashcard_set_dto_1.FlashcardSetDto]),
    __metadata("design:returntype", Promise)
], FlashcardsController.prototype, "createSet", null);
__decorate([
    (0, common_1.Put)('/sets/:setId'),
    __param(0, (0, common_1.Param)('setId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, flashcard_set_dto_1.FlashcardSetDto]),
    __metadata("design:returntype", Promise)
], FlashcardsController.prototype, "updateSetById", null);
__decorate([
    (0, common_1.Delete)('/sets/:setId'),
    __param(0, (0, common_1.Param)('setId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FlashcardsController.prototype, "deleteSetById", null);
__decorate([
    (0, common_1.Post)('sets/:setId/cards'),
    __param(0, (0, common_1.Param)('setId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, flashcard_dto_1.FlashCardDto]),
    __metadata("design:returntype", Promise)
], FlashcardsController.prototype, "addFlashcard", null);
exports.FlashcardsController = FlashcardsController = __decorate([
    (0, common_1.Controller)('flashcards'),
    __metadata("design:paramtypes", [flashcards_service_1.FlashcardsService])
], FlashcardsController);
//# sourceMappingURL=flashcards.controller.js.map