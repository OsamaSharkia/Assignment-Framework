import { IsString, IsArray, IsDateString, IsOptional, IsNumber } from 'class-validator';
import { FlashCardDto } from './flashcard.dto';
import { CommentDto } from './comment.dto';
import { ApiProperty } from '@nestjs/swagger';
export class FlashcardSetDto {
 

  @ApiProperty({ description: 'The name of the flashcard set' })
  @IsString()
  name: string;

  @ApiProperty({ type: [FlashCardDto], description: 'List of flashcards in the set' })
  @IsArray()
  cards: FlashCardDto[];

  @ApiProperty({ type: [CommentDto], description: 'List of comments for the flashcard set', required: false })
  @IsOptional()
  @IsArray()
  comments: CommentDto[];

  

  @ApiProperty({ description: 'Timestamp of when the set was created' })
  @IsDateString()
  created_at: string;

  @ApiProperty({ description: 'Timestamp of the last update to the set' })
  @IsDateString()
  updated_at: string;
}






