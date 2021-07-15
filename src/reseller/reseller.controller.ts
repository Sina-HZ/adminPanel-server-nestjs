import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateResellerDto } from "./dto/create-reseller.dto";
import { ResellerService } from "./reseller.service";

@Controller('reseller')
export class ResellerController {
    constructor(
        private readonly resellerService: ResellerService
    ){}

    @Get('/')
    async allReseller() {
        return await this.resellerService.findAll()
    }

    @Get('/:id')
    async getReseller(@Param('id') id: string) {
        return await this.resellerService.findOne(id)
    }

    @Post('add')
    async create(@Body() reselerData: CreateResellerDto) {
        return this.resellerService.create(reselerData)
    }
}