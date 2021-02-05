import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { FileModule } from './file/file.module';
import { SliderController } from './sliders/slider.controller';
import { SliderModule } from './sliders/slider.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'upload/sliders'),
    //   exclude: ['/api*'],
    // }),
    UserModule,

    SliderModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
