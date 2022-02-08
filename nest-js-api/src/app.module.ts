import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Board } from './boards/entities/board.entity';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exceptions/all-exception.filter';
import { LoggerModule } from 'nestjs-pino';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 6000,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Task, Board],
      synchronize: false,
      migrations: ['migration/*.js'],
      cli: {
        migrationsDir: 'migration'
      }
    }), UsersModule, BoardsModule, TasksModule, FilesModule,
    LoggerModule.forRoot({
        pinoHttp: {
          genReqId: () => Math.random(),
          prettyPrint: true,
        }
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }]
})
export class AppModule {}

process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  process.nextTick(() => process.exit(1));
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

