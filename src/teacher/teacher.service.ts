import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher)
        private teachers: Repository<Teacher>,
    ) {}

    async getTeachers(): Promise<Teacher[]> {
        return await this.teachers.find();
    }

    async getTeacherById(teacherId: string): Promise<Teacher> {
        return await this.teachers.findOne({id: teacherId});
    }
}
