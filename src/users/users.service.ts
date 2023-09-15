import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    // Verifique se o usuário com o mesmo e-mail já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('O usuário com este e-mail já existe.');
    }

    // Crie um novo usuário
    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    return newUser;
  }

  async findAllUsers() {
    // Liste todos os usuários
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findUserById(id: string) {
    const idNumber: number = Number(id);

    // Encontre um usuário por ID
    const user = await this.prisma.user.findUnique({
      where: { id: idNumber },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const idNumber: number = Number(id);
    const { name, email, birthdate, biography } = updateUserDto;

    // Atualize os dados do usuário
    const updatedUser = await this.prisma.user.update({
      where: { id: idNumber },
      data: {
        name,
        email,
        birthdate,
        biography,
      },
    });

    if (!updatedUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return updatedUser;
  }

  async removeUser(id: string) {
    const idNumber: number = Number(id);
    // Exclua um usuário

    await this.findUserById(id);

    await this.prisma.user.delete({
      where: { id: idNumber },
    });
  }
}
