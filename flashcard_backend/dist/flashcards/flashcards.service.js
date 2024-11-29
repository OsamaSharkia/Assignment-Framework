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
exports.FlashcardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flashcard_set_entity_1 = require("./entities/flashcard-set.entity");
const flashcard_entity_1 = require("./entities/flashcard.entity");
const comment_entity_1 = require("./entities/comment.entity");
let FlashcardsService = class FlashcardsService {
    constructor(flashcardSetRepository, flashCardRepository, commentRepository) {
        this.flashcardSetRepository = flashcardSetRepository;
        this.flashCardRepository = flashCardRepository;
        this.commentRepository = commentRepository;
    }
    async findAllSets() {
        return await this.flashcardSetRepository.find({ relations: ['cards', 'comments'] });
    }
    async findSetById(setId) {
        const set = await this.flashcardSetRepository.findOne({
            where: { id: setId },
            relations: ['cards', 'comments'],
        });
        if (!set) {
            throw new common_1.NotFoundException(`Flashcard Set with ID ${setId} not found`);
        }
        return set;
    }
    async createSet(createFlashcardSetDto) {
        const newSet = this.flashcardSetRepository.create(createFlashcardSetDto);
        return await this.flashcardSetRepository.save(newSet);
    }
    async updateSetById(setId, setDto) {
        const existingSet = await this.findSetById(setId);
        if (!existingSet) {
            throw new common_1.NotFoundException(`Flashcard Set with ID ${setId} not found`);
        }
        if (setDto.name) {
            existingSet.name = setDto.name;
        }
        await this.flashcardSetRepository.save(existingSet);
        if (setDto.cards && setDto.cards.length > 0) {
            for (const cardDto of setDto.cards) {
                if (cardDto.id) {
                    const existingCard = await this.flashCardRepository.findOne({
                        where: { id: cardDto.id, set: { id: setId } },
                    });
                    if (existingCard) {
                        if (cardDto.question)
                            existingCard.question = cardDto.question;
                        if (cardDto.answer)
                            existingCard.answer = cardDto.answer;
                        if (cardDto.difficulty)
                            existingCard.difficulty = cardDto.difficulty;
                        await this.flashCardRepository.save(existingCard);
                    }
                    else {
                        throw new common_1.NotFoundException(`Flashcard with ID ${cardDto.id} not found in set ${setId}`);
                    }
                }
                else {
                    const newCard = this.flashCardRepository.create({
                        question: cardDto.question,
                        answer: cardDto.answer,
                        difficulty: cardDto.difficulty,
                        set: existingSet,
                    });
                    await this.flashCardRepository.save(newCard);
                }
            }
        }
        return await this.findSetById(setId);
    }
    async deleteSetById(setId) {
        const deleteResult = await this.flashcardSetRepository.delete(setId);
        if (deleteResult.affected === 0) {
            throw new common_1.NotFoundException(`Flashcard Set with ID ${setId} not found`);
        }
    }
    async addFlashcard(setId, createFlashcardDto) {
        const set = await this.findSetById(setId);
        const flashcard = this.flashCardRepository.create({ ...createFlashcardDto, set });
        return await this.flashCardRepository.save(flashcard);
    }
};
exports.FlashcardsService = FlashcardsService;
exports.FlashcardsService = FlashcardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(flashcard_set_entity_1.FlashcardSet)),
    __param(1, (0, typeorm_1.InjectRepository)(flashcard_entity_1.FlashCard)),
    __param(2, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FlashcardsService);
//# sourceMappingURL=flashcards.service.js.map