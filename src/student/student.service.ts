import { Injectable } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from "./dto/student.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private students: Repository<Student>,
    ) {}

    async getStudents(): Promise<Student[]> {
        return await this.students.find();
    }

    async getStudentById(studentId: string): Promise<Student> {
        return await this.students.findOne({id: studentId});
    }

    async createStudent(payload: CreateStudentDto): Promise<Student> {
        let newStudent = new Student();
        newStudent = {
            ...newStudent,
            ...payload
        };

        await this.students.save(newStudent);

        return newStudent;
    }

    async updateStudent(studentId: string, payload: UpdateStudentDto): Promise<Student> {
        let updateStudent = await this.students.findOne({id: studentId});
        updateStudent = {
            ...updateStudent,
            ...payload,
        };
        await this.students.save(updateStudent);
        return updateStudent;        
    }

    async deleteStudent(studentId: string): Promise<Student> {
        let deleteStudent = await this.students.findOne({id: studentId});
        await this.students.remove(deleteStudent);
        return deleteStudent;        
    }

    async getStudentsByTeacherId(teacherId: string): Promise<Student[]> {
        const studentList = await this.students.find({teacher: teacherId}) 
        return studentList;
    }

    async updateStudentByTeacherId(teacherId: string, studentId: string, payload: UpdateStudentDto): Promise<Student> {
        let updateStudent = await this.students.findOne({id: studentId, teacher: teacherId,});
        updateStudent = {
            ...updateStudent,
            ...payload,
        }
        await this.students.save(updateStudent);
        return updateStudent;

    }
}
