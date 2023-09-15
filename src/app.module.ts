import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UsersModule, PrismaModule, PostsModule],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
