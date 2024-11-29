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
exports.FlashcardSet = void 0;
const typeorm_1 = require("typeorm");
const flashcard_entity_1 = require("./flashcard.entity");
const comment_entity_1 = require("./comment.entity");
const collection_entity_1 = require("../../collections/entities/collection.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let FlashcardSet = class FlashcardSet {
};
exports.FlashcardSet = FlashcardSet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FlashcardSet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FlashcardSet.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => flashcard_entity_1.FlashCard, (flashcard) => flashcard.set, { cascade: true }),
    __metadata("design:type", Array)
], FlashcardSet.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.set, { cascade: true }),
    __metadata("design:type", Array)
], FlashcardSet.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => collection_entity_1.Collection, (collection) => collection.sets, { onDelete: 'CASCADE', nullable: true }),
    __metadata("design:type", collection_entity_1.Collection)
], FlashcardSet.prototype, "collection", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.flashcardSets, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], FlashcardSet.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], FlashcardSet.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], FlashcardSet.prototype, "updatedAt", void 0);
exports.FlashcardSet = FlashcardSet = __decorate([
    (0, typeorm_1.Entity)()
], FlashcardSet);
//# sourceMappingURL=flashcard-set.entity.js.map