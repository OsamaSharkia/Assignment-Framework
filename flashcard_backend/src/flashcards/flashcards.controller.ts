import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { FlashcardSetDto } from './dto/flashcard-set.dto';
import { FlashCardDto } from './dto/flashcard.dto';
import { FlashcardSet } from './entities/flashcard-set.entity';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get('/sets')
  async getAllSets(): Promise<FlashcardSet[]> {
    return await this.flashcardsService.findAllSets();
  }

  @Get('/sets/:setId')
  async getSetById(@Param('setId', ParseIntPipe) setId: number): Promise<FlashcardSet> {
    return await this.flashcardsService.findSetById(setId);
  }

  @Post('/sets')
  async createSet(@Body() setDto: FlashcardSetDto): Promise<FlashcardSet> {
    return await this.flashcardsService.createSet(setDto);
  }

  @Put('/sets/:setId')
  async updateSetById(
    @Param('setId', ParseIntPipe) setId: number,
    @Body() setDto: FlashcardSetDto,
  ): Promise<FlashcardSet> {
    return await this.flashcardsService.updateSetById(setId, setDto);
  }

  @Delete('/sets/:setId')
  async deleteSetById(@Param('setId', ParseIntPipe) setId: number): Promise<void> {
    return await this.flashcardsService.deleteSetById(setId);
  }
  @Post('sets/:setId/cards')
  async addFlashcard(@Param('setId') setId: number, @Body() createFlashcardDto: FlashCardDto) {
    return await this.flashcardsService.addFlashcard(setId, createFlashcardDto);
  }
}
