import { HttpException, HttpStatus } from '@nestjs/common';

export class NoContentException extends HttpException {
  constructor(response?: string) {
    super(response, HttpStatus.NO_CONTENT);
  }
}
