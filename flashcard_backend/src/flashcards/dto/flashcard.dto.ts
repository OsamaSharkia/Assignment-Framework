import { IsString, IsOptional } from 'class-validator';
import { Difficulty } from './difficulty.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FlashCardDto {
  id?: number; 
  @ApiProperty({ description: 'The question for the flashcard' })
  @IsString()
  question: string;

  @ApiProperty({ description: 'The answer for the flashcard' })
  @IsString()
  answer: string;

  @ApiProperty({ enum: Difficulty, description: 'The difficulty level of the flashcard', required: false })
  @IsOptional()
  difficulty: Difficulty;
}
