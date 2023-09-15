import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = await this.prisma.post.create({
      data: createPostDto,
    });

    return newPost;
  }

  async findAll() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async findPostById(id: string) {
    const postId: number = Number(id);
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post não encontrado.');
    }

    return post;
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const postId: number = Number(id);
    const updatedPost = await this.prisma.post.update({
      where: { id: postId },
      data: updatePostDto,
    });
    if (!updatedPost) {
      throw new NotFoundException('Post não encontrado.');
    }

    return updatedPost;
  }

  async remove(id: string) {
    const postId: number = Number(id);
    await this.findPostById(id);

    await this.prisma.post.delete({
      where: { id: postId },
    });
  }
}
