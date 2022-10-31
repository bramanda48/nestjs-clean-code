import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Default')
@Controller()
export class AppController {
    constructor() { }

    @Get('/')
    @Version(VERSION_NEUTRAL)
    welcome() {
        return {
            "appVersion": process.env.npm_package_version
        };
    }
}
