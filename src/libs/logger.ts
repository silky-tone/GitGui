export type LoggerType = 'log' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export class Logger {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  private sendMessage(type: LoggerType, message: string) {
    console.log(`[${this.name}] ${type}: ${message}`);
  }

  log(message: string) {
    this.sendMessage('log', message);
  }

  error(message: string) {
    this.sendMessage('error', message);
  }

  warn(message: string) {
    this.sendMessage('warn', message);
  }

  info(message: string) {
    this.sendMessage('info', message);
  }

  debug(message: string) {
    this.sendMessage('debug', message);
  }

  trace(message: string) {
    this.sendMessage('trace', message);
  }
}
