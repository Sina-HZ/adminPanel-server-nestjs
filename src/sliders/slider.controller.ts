import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { CreateSliderDto } from "./dto/create-slider.dto";
import { SliderService } from "./slider.service";

@Controller('slider')
export class SliderController {
    constructor(private readonly sliderService: SliderService) { }

    @Get('list')
    async getSlider() {
        const list = await this.sliderService.list();
        return list
    }

    @Post()
    async addSlider(@Body() body ,@Headers('Authorization') token) {
        const rawToken = token.split(' ')[1]
        const slider = await this.sliderService.create({...body,token: rawToken});
        return slider;
    }
}
