import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { FileEntity } from 'src/file/file.entity';
import { ResellerEntity } from 'src/reseller/reseller.entity';
import { SliderEntity } from 'src/sliders/slider.entity';
import { UserEntity } from 'src/user/user.entity';
import EnvFile from './env.service';

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {         
        this.env = env
    }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`)
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true)
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV'
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',

            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT'),10),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),
            synchronize: true,
            entities: [UserEntity, SliderEntity, FileEntity, ResellerEntity],
            // migrationsTableName: 'migration',
            // migrations: ['src/migration/*.ts'],

            // cli: {
            //     migrationsDir: 'src/migration',
            // },

            // ssl: this.isProduction()
        }
    }
}

const configService = new ConfigService(EnvFile)
    .ensureValues([
        'POSTGRES_HOST',
        'POSTGRES_PORT',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
        'POSTGRES_DATABASE'
    ]);

export { configService };