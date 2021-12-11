import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService
        ) {}

    async validateAccount(username: string, password: string): Promise<any> {
        const account = await this.accountService.findOne(username);
        if(account && account.password === password) {
            const { password, ...result } = account;
            return result;
        }
        return null;
    }

    async login(account: any) {
        const payload = {username: account.username, sub: account.id, role: account.role};
        return {
            access_token: this.jwtService.sign(payload), 
        }
    }
}
