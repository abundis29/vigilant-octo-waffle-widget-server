import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity()
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ length: 25 })
    name: string;

    @ManyToOne(type => User, user => user.groups)
    user: User

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @JoinTable()
    @ManyToMany(() => Permission, (permission) => permission.roles)
    permissions: Permission[];
}
