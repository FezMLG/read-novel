import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class BookService {
  constructor(
    @InjectQueue('books-queue')
    private readonly booksQueue: Queue
  ) {}
}
