import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Get()
    async getTeachers() {
        return await this.teacherService.getTeachers();
    }

    @Get('/:teacherId')
    async getTeacherById(
        @Param('teacherId', new ParseUUIDPipe()) teacherId: string
    ) {
        return await this.teacherService.getTeacherById(teacherId);
    }
}
