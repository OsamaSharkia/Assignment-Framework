import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { FlashcardSetDto } from '../../flashcards/dto/flashcard-set.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CollectionDto {


  @ApiProperty({
    description: 'Name of the collection',
    example: 'Science Facts',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'List of flashcard sets within the collection',
    type: [FlashcardSetDto],
  })
  @IsArray()
  sets: FlashcardSetDto[];

  @ApiProperty({ description: 'ID of the flashcard set to include in the collection', required: false })
  @IsOptional()
  @IsNumber()
  flashcardSetId?: number;
  
  @ApiProperty({
    description: 'Optional comment about the collection',
    example: 'This collection contains fun facts about science!',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment: string;
}
