import { Injectable } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createStudentDto: Prisma.studentsCreateInput) {
    return this.databaseService.students.create({
      data: createStudentDto,
    });
  }

  async findAll() {
    return this.databaseService.students.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.students.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.databaseService.students.update({
      where: {
        id,
      },
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.students.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: number) {
    return this.databaseService.students.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
}
