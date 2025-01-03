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
exports.FlashCard = void 0;
const typeorm_1 = require("typeorm");
const flashcard_set_entity_1 = require("./flashcard-set.entity");
let FlashCard = class FlashCard {
};
exports.FlashCard = FlashCard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FlashCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FlashCard.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FlashCard.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FlashCard.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => flashcard_set_entity_1.FlashcardSet, (flashcardSet) => flashcardSet.cards, { onDelete: 'CASCADE' }),
    __metadata("design:type", flashcard_set_entity_1.FlashcardSet)
], FlashCard.prototype, "set", void 0);
exports.FlashCard = FlashCard = __decorate([
    (0, typeorm_1.Entity)()
], FlashCard);
//# sourceMappingURL=flashcard.entity.js.map