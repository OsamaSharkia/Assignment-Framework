import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlashcardSet } from './entities/flashcard-set.entity';
import { FlashcardSetDto } from './dto/flashcard-set.dto';
import { FlashCardDto } from './dto/flashcard.dto';
import { FlashCard } from './entities/flashcard.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectRepository(FlashcardSet)
    private flashcardSetRepository: Repository<FlashcardSet>,

    @InjectRepository(FlashCard)
    private flashCardRepository: Repository<FlashCard>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findAllSets(): Promise<FlashcardSet[]> {
    return await this.flashcardSetRepository.find({ relations: ['cards', 'comments'] });
  }

  async findSetById(setId: number): Promise<FlashcardSet> {
    const set = await this.flashcardSetRepository.findOne({
      where: { id: setId },
      relations: ['cards', 'comments'],
    });
    if (!set) {
      throw new NotFoundException(`Flashcard Set with ID ${setId} not found`);
    }
    return set;
  }

  async createSet(createFlashcardSetDto: FlashcardSetDto): Promise<FlashcardSet> {
    const newSet = this.flashcardSetRepository.create(createFlashcardSetDto);
    return await this.flashcardSetRepository.save(newSet);
  }

async updateSetById(setId: number, setDto: FlashcardSetDto): Promise<FlashcardSet> {
  // Step 1: Update Flashcard Set Attributes
  const existingSet = await this.findSetById(setId);
  if (!existingSet) {
    throw new NotFoundException(`Flashcard Set with ID ${setId} not found`);
  }

  // Update the flashcard set name if provided
  if (setDto.name) {
    existingSet.name = setDto.name;
  }

  // Save the updated flashcard set (name or other top-level properties)
  await this.flashcardSetRepository.save(existingSet);

  // Step 2: Update Flashcards in the Set (if provided in DTO)
  if (setDto.cards && setDto.cards.length > 0) {
    for (const cardDto of setDto.cards) {
      if (cardDto.id) {
        // Update existing flashcard
        const existingCard = await this.flashCardRepository.findOne({
          where: { id: cardDto.id, set: { id: setId } },
        });

        if (existingCard) {
          if (cardDto.question) existingCard.question = cardDto.question;
          if (cardDto.answer) existingCard.answer = cardDto.answer;
          if (cardDto.difficulty) existingCard.difficulty = cardDto.difficulty;

          await this.flashCardRepository.save(existingCard);
        } else {
          throw new NotFoundException(`Flashcard with ID ${cardDto.id} not found in set ${setId}`);
        }
      } else {
        // If no ID is provided, create a new flashcard
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

  // Return the updated flashcard set, including updated cards
  return await this.findSetById(setId);
}

  async deleteSetById(setId: number): Promise<void> {
    const deleteResult = await this.flashcardSetRepository.delete(setId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Flashcard Set with ID ${setId} not found`);
    }
  }
  async addFlashcard(setId: number, createFlashcardDto: FlashCardDto): Promise<FlashCard> {
    const set = await this.findSetById(setId);
    const flashcard = this.flashCardRepository.create({ ...createFlashcardDto, set });
    return await this.flashCardRepository.save(flashcard);
  }
}
