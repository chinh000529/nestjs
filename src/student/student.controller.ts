import { Body, Controller, Get, Param, Post, Put , ParseUUIDPipe, Delete } from "@nestjs/common";
import { CreateStudentDto, UpdateStudentDto } from "./dto/student.dto";
import { StudentService } from "./student.service";

@Controller('students')
export class StudentController {
    constructor(private studentService: StudentService) {}

    @Get()
    async getStudents() {
        return await this.studentService.getStudents();
    }

    @Get('/:studentId')
    async getStudentById(
        @Param('studentId', new ParseUUIDPipe()) studentId: string,
    ) {
        return await this.studentService.getStudentById(studentId);
    }

    @Post()
    async createStudent(
        @Body() body: CreateStudentDto,
    ) {
        return await this.studentService.createStudent(body);
    }

    @Put('/:studentId')
    async updateStudent(
        @Param('studentId', new ParseUUIDPipe()) studentId: string,
        @Body() body: UpdateStudentDto,
    ) {
        return await this.studentService.updateStudent(studentId, body);
    }

    @Delete('/:studentId')
    async deleteStudent(
        @Param('studentId', new ParseUUIDPipe()) studentId: string,
    ) {
        return await this.studentService.deleteStudent(studentId);
    }
}
 