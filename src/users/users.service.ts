import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NewUserInput } from './dto/new-user.input';
import { AuthUserInput } from './dto/auth-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(data: NewUserInput): Promise<User> {
    const newUser = await this.usersRepository.save(data)
    return newUser as User;
  }

  async auth(data: AuthUserInput): Promise<User> {
    const user = await this.usersRepository.findOne({ name: data.name })
    if (!user) throw new NotFoundException(user);
    console.log('user', user)
    if (data.pass === user.pass) {
      console.log('success')
      const token = this.jwtService.sign({...user});
      console.log(token)

    }

    return user as User;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({id})
    if (!user) throw new NotFoundException(user);
    return user as User;
  }


}
