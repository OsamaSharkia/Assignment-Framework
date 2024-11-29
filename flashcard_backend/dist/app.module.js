"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const flashcards_module_1 = require("./flashcards/flashcards.module");
const users_module_1 = require("./users/users.module");
const collections_module_1 = require("./collections/collections.module");
const user_entity_1 = require("./users/entities/user.entity");
const flashcard_set_entity_1 = require("./flashcards/entities/flashcard-set.entity");
const flashcard_entity_1 = require("./flashcards/entities/flashcard.entity");
const collection_entity_1 = require("./collections/entities/collection.entity");
const comment_entity_1 = require("./flashcards/entities/comment.entity");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'database.sqlite',
                entities: [user_entity_1.User, comment_entity_1.Comment, flashcard_set_entity_1.FlashcardSet, flashcard_entity_1.FlashCard, collection_entity_1.Collection],
                synchronize: true,
            }),
            flashcards_module_1.FlashcardsModule,
            users_module_1.UsersModule,
            collections_module_1.CollectionsModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map