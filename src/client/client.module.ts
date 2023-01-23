import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [ConfigModule],
})
export class ClientModule {}
