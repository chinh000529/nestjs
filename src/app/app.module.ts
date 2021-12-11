import { Module } from '@nestjs/common';
import { StudentModule } from "../student/student.module";
import { TeacherModule } from "../teacher/teacher.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { AccountModule } from "../account/account.module"
import { Account } from "../account/account.entity"
import { AuthModule } from "../auth/auth.module"
@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'bai1',
      entities: [Student, Teacher, Account],
      synchronize: true,
    }),
    StudentModule,
    TeacherModule,
    AccountModule,
    AuthModule
  ],
})
export class AppModule {}
