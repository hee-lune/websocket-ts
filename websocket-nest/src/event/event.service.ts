import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  test() {
    console.log('test');
    return 'test';
  }
}
