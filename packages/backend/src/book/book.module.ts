import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookFacade } from './book.facade';
import { BookService } from './book.service';

@Module({
  controllers: [BookController],
  providers: [BookService, BookFacade],
})
export class BookModule {}
