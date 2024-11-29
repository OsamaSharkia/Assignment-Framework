"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const collections_service_1 = require("./collections.service");
const collections_controller_1 = require("./collections.controller");
const collection_entity_1 = require("./entities/collection.entity");
const flashcard_set_entity_1 = require("../flashcards/entities/flashcard-set.entity");
const comment_entity_1 = require("../flashcards/entities/comment.entity");
let CollectionsModule = class CollectionsModule {
};
exports.CollectionsModule = CollectionsModule;
exports.CollectionsModule = CollectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([collection_entity_1.Collection, flashcard_set_entity_1.FlashcardSet, comment_entity_1.Comment]),
        ],
        controllers: [collections_controller_1.CollectionsController],
        providers: [collections_service_1.CollectionsService],
        exports: [collections_service_1.CollectionsService],
    })
], CollectionsModule);
//# sourceMappingURL=collections.module.js.map