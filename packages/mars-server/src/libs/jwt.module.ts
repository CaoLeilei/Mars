import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import type { Configs } from '@libs/config'

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Configs, true>) => {
        return {
          isGlobal: true,
          secret: configService.get('jwt.secret', { infer: true }),
          signOptions: {
            expiresIn: configService.get('jwt.accessExpiry', { infer: true }),
            algorithm: configService.get('jwt.algorithm', { infer: true }),
          },
        }
      },
    }),
  ],
  exports: [JwtModule],
})
export class NestJwtModule {}
