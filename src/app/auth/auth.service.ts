/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CommonPropsAuth, CommonPropsUpdate } from '../../common/common';
import { RegistroNaoEncontradoException } from '../../exceptions/registro-inexistente.exception';
import { User } from '../usuario/entities/user.entity';
import { UserService } from '../usuario/user.service';
import { UpdatePasswordDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService
  ){}

  async authenticate({email, password}: CommonPropsAuth): Promise<User>{
    const user = await this.userService.findOne({query: { where: { email }, select: {} }});
    if (!user){
      throw new RegistroNaoEncontradoException({
        coluna: 'email',
        valor: email,
      });
    }
    const salt = await bcrypt.genSalt();
    const passwordProps = await bcrypt.hash(password, salt);
    if(password == user.password) return user;
    throw new BadRequestException('Usuário ou senha incorretos');
  }
  
  async updatePassword(
      props: CommonPropsUpdate<UpdatePasswordDto>,
  ): Promise<boolean> {
    const model = props.transaction.manager.getRepository(User);
    const user = await model.findOne({ where: { id: props.id } });
    if (!user)
        throw new RegistroNaoEncontradoException({
            coluna: 'id',
            valor: props.id,
        });
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(props.body.password, salt);
    await model.update({ id: props.id }, { password });
    return true;
}
}
