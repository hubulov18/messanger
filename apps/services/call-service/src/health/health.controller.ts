import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): { status: 'ok'; service: 'call-service' } {
    return {
      status: 'ok',
      service: 'call-service',
    };
  }
}
