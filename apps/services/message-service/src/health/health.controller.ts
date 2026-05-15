import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): { status: 'ok'; service: 'message-service' } {
    return {
      status: 'ok',
      service: 'message-service',
    };
  }
}
