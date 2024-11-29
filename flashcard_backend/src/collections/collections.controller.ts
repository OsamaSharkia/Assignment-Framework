import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionDto } from './dto/collection.dto';
import {CommentDto} from '../flashcards/dto/comment.dto';
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  findAllCollections() {
    return this.collectionsService.findAllCollections();
  }

  @Get('random')
  redirectToRandomCollection() {
    return this.collectionsService.redirectToRandomCollection();
  }

  @Get(':id')
  findCollectionById(@Param('id') id: number) {
    return this.collectionsService.findCollectionById(id);
  }

  @Post()
  createCollection(@Body() collectionDto: CollectionDto) {
    return this.collectionsService.createCollection(collectionDto);
  }
 
  @Put(':id')
  updateCollectionById(@Param('id') id: number, @Body() collectionDto: CollectionDto) {
    return this.collectionsService.updateCollectionById(id, collectionDto);
  }

  @Delete(':id')
  deleteCollectionById(@Param('id') id: number) {
    return this.collectionsService.deleteCollectionById(id);
  }
  @Post(':id/comments')
  async addCommentToCollection(@Param('id') id: number, @Body() commentDto: CommentDto) {
    return this.collectionsService.addCommentToCollection(id, commentDto);
  }

}
