import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './Schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly authModel:Model<User>,private jwtService:JwtService){}
  async signUp(payload:CreateUserDto){
    const{email}=payload
    const user = await this.authModel.findOne({email})
    
    if (user){
      throw new UnauthorizedException('username already exist')
    }
    const signUp = new this.authModel(payload)
    await signUp.save()
    return {
      message: "successfully",
      result: signUp
    }
  }

  async logIn(payload:CreateUserDto){
    const {email,password} = payload

    const findUser = await this.authModel.findOne({email})
    console.log(findUser);

    if (findUser?.password !== password){
      throw new UnauthorizedException('wrong password')
    }
    const tokenHolder= {email:findUser.email,userId:findUser._id};
    const accessToken = await this.jwtService.signAsync(tokenHolder)
    return {
      msg: 'sucessfull',
      user: findUser,
      token: accessToken
    }
  }  


  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
