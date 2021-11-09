import { Injectable, NestMiddleware , HttpException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response, NextFunction } from "express";
import { Student } from "src/student/student.entity";
import { Repository } from "typeorm";

@Injectable()
export class ValidStudentMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(Student)
        private students: Repository<Student>,
    ){}
    async use(req: Request, res: Response, next: NextFunction) {
        const studentId = req.params.studentId;
        const studentExists = await this.students.findOne({id: studentId});
        if(!studentExists) {
            throw new HttpException("Student not found", 400);
        }
        next()
    }
}