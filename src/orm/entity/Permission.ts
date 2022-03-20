import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Role from "../types/roles.enum";
import { Group } from "./Group";

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  name: string;

  @Column({ length: 100 })
  description: string;

  @ManyToMany(() => Group, (role) => role.permissions)
  roles: Role[];
}
