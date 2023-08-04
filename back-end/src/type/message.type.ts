import { HttpStatus } from '@nestjs/common';

export class Message {
    status: HttpStatus;
    message: string;
    data?: any | any[];

    constructor(status: HttpStatus, message: string, data?: any | any[]) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
