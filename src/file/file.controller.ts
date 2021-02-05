import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { join } from 'path';
import { FileService } from "./file.service";


@Controller()
export class FileController {

    constructor(private readonly fileService: FileService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { dest: './upload/sliders' }))
    async uploadFile(@UploadedFile() file) {
        const createdFile = await this.fileService.saveFile(file);
        return createdFile
    }

    @Get('file/:id')
    async showFile(@Param() param, @Res() res: Response) {
        const file = await this.fileService.findeOne(param.id);
        if (!file) {
            return null
        }
        res.sendFile(join(__dirname, '../..', 'upload/sliders/') + file.filename)
    }
}