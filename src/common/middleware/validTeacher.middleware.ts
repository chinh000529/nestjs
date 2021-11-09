import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, response, NextFunction} from "express";
import { Teacher } from "src/teacher/teacher.entity";
import { Repository } from "typeorm";

@Injectable()
export class ValidTeacherMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(Teacher)
        private teachers: Repository<Teacher>,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const teacherId = req.params.teacherId;
        const teacherExists = await this.teachers.findOne({id: teacherId});
        if(!teacherExists) {
            throw new HttpException("teacher not found", 400);
        }
        next();
    }
}