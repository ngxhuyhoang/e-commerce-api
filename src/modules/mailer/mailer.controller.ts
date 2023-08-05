import { Controller, UseGuards } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

@Controller('mailer')
@ApiTags('Mailer')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
}
