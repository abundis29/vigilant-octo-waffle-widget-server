import { Field, ID, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
import Role from "../types/roles.enum";
import { Group } from "./Group";
const bcrypt = require('bcryptjs');
@Entity()
@ObjectType()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number

	//  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
	//  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
	//  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

	@Field(() => String)
	@Column("varchar", { nullable: true })
	fullName: string

	@Field(() => String)
	@Column("varchar", { nullable: true })
	username: string

	@Field(() => String)
	@Column("varchar", { default: '' })
	facebookId: string



	@Field(() => String)
	@Column("varchar", { nullable: true, length: 500 })
	token: string
	setToken(jwt: string) {
		this.token = jwt
		//divide and 
	}

	@Field(type => [String])
	@Column("enum", {
		array: true,
		enum: Role,
		default: [Role.User]
	})
	public role: Role[]

	@Field(() => String)
	@Column({ default: '' })
	refreshToken: string
	setRefreshToken(jwt: string) {
		this.refreshToken = jwt
		//divide and 
	}


	@Field(() => String)
	@Column({ length: 500, unique: true })
	email: string


	@Field(() => Boolean)
	@Column({ default: false, nullable: true })
	emailVerified: boolean

	// @Field(() => String)
	@Column({ length: 500, nullable: true })
	password: string
	setPassword(pw: string) {
		this.password = pw
		//divide and 
	}

	@Column()
	@CreateDateColumn()
	createdAt: Date

	@Column()
	@UpdateDateColumn()
	updatedAt: Date

	//  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


	// @OneToMany(type => Group, group => group.id)
	// groups: Group[]

	// @OneToMany(() => Group, group => group.user)
  
	@Field(type => [String])
	@ManyToMany(() => Group, group => group.user)
    @JoinTable()
	groups: Group[];


	//  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
	//  ║╣ ║║║╠╩╗║╣  ║║╚═╗
	//  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

	async validatePassword(plainTextPassword: string) {
		return await bcrypt.compare(plainTextPassword, this.password + '')
	}
	async findOrCreate(query: object) {
		const user = await User.findOne({ where: { query } });
		if (!user) {
			const user = await User.create(query);
			return await user
		}
		return await user
	}

	// @OneToMany(type => ShoppingList, shoppingList => shoppingList.owner)
	// lists: Promise<ShoppingList[]>

	toJSON() {
		return {
			id: this.id,
			fullName: this.fullName,
			username: this.username,
			email: this.email
		}
	}

}

