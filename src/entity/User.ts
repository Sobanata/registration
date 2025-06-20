import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column({nullable:true})
    email: string;

    @Column({nullable:true})
    password: string; 

    @Column({nullable:true})
    username: string;

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]

    @Column({nullable:true})
    token: string;
}   