import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { encodePassword } from 'src/passwordEncryption/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
  ) {}

  async create(userDetails: CreateUserDto) {
    const password = encodePassword(userDetails.password);
    const newUser = this._userRepository.create({
      ...userDetails,
      password,
    });
    const user = await this._userRepository.save(newUser);
    user.password = undefined;
    return user;
  }

  async findAll() {
    const user = await this._userRepository.find();
    return user;
  }

  async findOne(id: number) {
    const user = await this._userRepository.findOne({
      where: {
        id: id,
      },
    });
    user.password = undefined;
    return user;
  }
  async findOneByName(name: string) {
    const user = await this._userRepository.findOne({
      where: {
        name: name,
      },
    });
    return user;
  }

  async update(id: number, updateUserDetails: UpdateUserDto) {
    const user = await this._userRepository.update(
      { id },
      { ...updateUserDetails },
    );
    if (user) {
      return user;
    }
    throw new HttpException(
      'Not Updated Please Try agaiin !! ',
      HttpStatus.FORBIDDEN,
    );
  }

  async remove(id: number) {
    await this._userRepository.delete({ id });
  }
}
