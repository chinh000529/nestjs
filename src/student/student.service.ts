import { HttpException, Injectable } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from "./dto/student.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepo: Repository<Student>,
    ) {}

    // paging
    async getStudents(): Promise<Student[]> {
        return await this.studentRepo.find();
    }

    async getStudentById(studentId: string): Promise<Student> {
        return await this.studentRepo.findOne({id: studentId});
    }

    async createStudent(payload: CreateStudentDto): Promise<Student> {
        const newStudent = this.studentRepo.create(payload);
        const studentCreated = await this.studentRepo.save(newStudent);
        return studentCreated;
    }

    async updateStudent(studentId: string, payload: UpdateStudentDto): Promise<Student> {
        let studentFound = await this.studentRepo.findOne({id: studentId});
        Object.assign(studentFound, payload);
        const studentUpdated = await this.studentRepo.save(studentFound);
        return studentUpdated;        
    }

    async deleteStudent(studentId: string): Promise<Student> {
        let studentFound = await this.studentRepo.findOne({id: studentId});
        await this.studentRepo.remove(studentFound);
        return studentFound;        
    }

    async getStudentsByTeacherId(teacherId: string): Promise<Student[]> {
        const studentList = await this.studentRepo.find({teacher: teacherId}) 
        return studentList;
    }

    async updateStudentByTeacherId(teacherId: string, studentId: string, payload: UpdateStudentDto): Promise<Student> {
        let studentFound = await this.studentRepo.findOne({id: studentId, teacher: teacherId,});
        Object.assign(studentFound, payload);
        const studentUpdated = await this.studentRepo.save(studentFound);
        return studentUpdated;

    }
}
