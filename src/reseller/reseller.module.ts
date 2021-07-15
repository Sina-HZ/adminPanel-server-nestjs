import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResellerController } from "./reseller.controller";
import { ResellerEntity } from "./reseller.entity";
import { ResellerService } from "./reseller.service";


@Module({
    imports: [TypeOrmModule.forFeature([ResellerEntity])],
    providers: [ResellerService],
    controllers: [ResellerController],
    exports: []
})

export class ResellerModule{}