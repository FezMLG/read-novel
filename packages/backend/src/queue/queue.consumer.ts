import { Processor, Process, OnQueueActive, InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { forwardRef, HttpException, HttpStatus, Inject } from '@nestjs/common';

@Processor('books-queue')
export class BooksConsumer {
  // constructor(
  // ) {}

  @Process('createBook')
  async createBook(job: Job<any>) {
    const { data } = job;
    console.log(data);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`
    );
  }
}
