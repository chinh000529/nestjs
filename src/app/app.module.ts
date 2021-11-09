import { Module } from '@nestjs/common';
import { StudentModule } from "../student/student.module";
import { TeacherModule } from "../teacher/teacher.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'Demo',
      entities: [Student, Teacher],
      synchronize: true,
    }),
    StudentModule,
    TeacherModule,
  ],
})
export class AppModule {}
