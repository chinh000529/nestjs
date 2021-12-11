import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./account.entity";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepo: Repository<Account>,
    ) {}

    async findOne(username: string): Promise<Account | undefined> {
        return await this.accountRepo.findOne({username: username});
    }
}