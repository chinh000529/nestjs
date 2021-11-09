import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TeacherController } from "./teacher.controller";
import { StudentTeacherIdController } from "./student.controller";
import { TeacherService } from './teacher.service';
import { StudentModule } from 'src/student/student.module';
import { ValidTeacherMiddleware } from "../common/middleware/validTeacher.middleware";
import { ValidStudentMiddleware } from 'src/common/middleware/validStudent.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Student } from 'src/student/student.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Teacher, Student]), StudentModule],
    controllers: [TeacherController, StudentTeacherIdController],
    providers: [TeacherService],
})
export class TeacherModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidTeacherMiddleware).forRoutes({
            path: 'teachers/:teacherId',
            method: RequestMethod.GET
        });
        consumer.apply(ValidTeacherMiddleware).forRoutes({
            path: 'teachers/:teacherId/students',
            method: RequestMethod.GET
        });
        consumer.apply(ValidTeacherMiddleware, ValidStudentMiddleware).forRoutes({
            path: 'teachers/:teacherId/students/:studentId',
            method: RequestMethod.PUT
        });
    }
}
