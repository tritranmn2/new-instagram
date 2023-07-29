import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashService {
    async hashPassword(password: string): Promise<string> {
        const saltOrRound = 10;
        return await bcrypt.hash(password, saltOrRound);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
