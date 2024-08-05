import { Injectable } from '@nestjs/common';

@Injectable()
class ConsoleService {
  showConsole(): void {
    console.log('test');
  }
}

export { ConsoleService };
