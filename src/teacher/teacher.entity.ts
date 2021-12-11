import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    accountId: string;
}
