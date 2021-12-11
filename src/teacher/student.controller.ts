import { Body, Controller, Get, Param, ParseUUIDPipe, Put, UseGuards, Request } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { UpdateStudentDto } from "../student/dto/student.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"

@Controller('teachers/:teacherId/students')
export class StudentTeacherIdController {
    constructor(private readonly studentService: StudentService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
    
    @Get()
    async getStudentsByTeacherID(
        @Param('teacherId', new ParseUUIDPipe()) teacherId: string
    ) {
        return await this.studentService.getStudentsByTeacherId(teacherId);
    }

    @Put('/:studentId')
    async updateStudentByTeacherID(
        @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
        @Param('studentId', new ParseUUIDPipe) studentId: string,
        @Body() body: UpdateStudentDto
    ) {
        return await this.studentService.updateStudentByTeacherId(teacherId, studentId, body);
    }
}
