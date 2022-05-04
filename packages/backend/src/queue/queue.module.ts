import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksConsumer } from './queue.consumer';

@Module({
  imports: [
    // BullModule.forRootAsync({
    //   useFactory: () => ({
    //     redis: {
    //       host: 'localhost',
    //       port: 6379,
    //     },
    //   }),
    // }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // BullModule.registerQueue({
    //   name: 'books-queue',
    // }),
    // TypeOrmModule.forFeature([TransferEntity]),
    // forwardRef(() => UserModule),
  ],
  providers: [BooksConsumer],
})
export class QueueModule {}
