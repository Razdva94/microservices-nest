import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
export declare class RabbitService {
    private jwtAuthGuard;
    constructor(jwtAuthGuard: JwtAuthGuard);
    handleEvent(data: string): Promise<any>;
}
