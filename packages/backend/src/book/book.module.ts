import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { BookController } from './book.controller';
import { BookFacade } from './book.facade';
import { BookService } from './book.service';

@Module({
  imports: [
    forwardRef(() => QueueModule),
    BullModule.registerQueue({
      name: 'books-queue',
    }),
  ],
  controllers: [BookController],
  providers: [BookService, BookFacade],
})
export class BookModule {}
