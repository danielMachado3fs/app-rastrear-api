import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
    CommonPropsCreate,
    CommonPropsDelete,
    CommonPropsFind,
    CommonPropsUpdate,
} from 'src/common/common';
import { USUARIO_REPOSITORY } from 'src/config/constants';
import { RegistroExistenteException } from 'src/exceptions/registro-existente.exception';
import { RegistroNaoEncontradoException } from 'src/exceptions/registro-inexistente.exception';
import { FindManyOptions, In, Like, Not, Repository } from 'typeorm';
import { tratarFindOptions } from '../../utils/helpers';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(USUARIO_REPOSITORY) private model: Repository<User>,
    ) {}

    async create({ body, transaction }: CommonPropsCreate<CreateUserDto>) {
        const model = transaction.manager.getRepository(User);
        const exist = model.findOne({ where: { email: body.email } });
        if (exist) {
            throw new RegistroExistenteException({
                coluna: 'email',
                valor: body.email,
            });
        }
        //CRIPTOGRAFA A SENHA DO USUÁRIO PARA SALVAR NO BANCO
        const salt = await bcrypt.getSalt();
        const password = await bcrypt.hash(body.password, salt);
        body.password = password;
        return model.save(body);
    }

    async update({
        id,
        body,
        transaction,
    }: CommonPropsUpdate<UpdateUserDto>) {
        const model = transaction.manager.getRepository(User);
        const user = model.findOne({ where: { id: id } });
        if (!user) {
            throw new RegistroNaoEncontradoException({
                coluna: 'id',
                valor: id,
            });
        }

        //VERIFICAR SE EXISTE ALGUM OUTRO USUÁRIO COM EMAIL INFORMADO
        const userExistente = model.findOne({
            where: { email: Like(body.email), id: Not(In([id])) },
        });
        if (userExistente) {
            throw new RegistroExistenteException({
                coluna: 'email',
                valor: body.email,
            });
        }

        //VERIFICAR SE MUDOU A SENHA, SE SIM, CRIPTOGRAFAR A NOVA SENHA
        if (body?.password) {
            const salt = await bcrypt.getSalt();
            const password = await bcrypt.hash(body.password, salt);
            body.password = password;
        }
        return model.save({ ...user, ...body });
    }

    async findOne(props: CommonPropsFind<User> & { id: number }) {
        let model = this.model;
        if (props?.transaction)
            model = props.transaction.manager.getRepository(User);
        let options: FindManyOptions<User> = {
            relations: { role: true },
            select: {
                id: true,
                name: true,
                email: true,
                role: {
                    id: true,
                    name: true,
                    permissions: true,
                },
                updatedAt: true,
                createdAt: true,
                deletedAt: true,
            },
        };
        options = { ...options, ...tratarFindOptions<User>(props) };
        return model.findOne(options);
    }

    async findAll(props: CommonPropsFind<User> = {}) {
        let model = this.model;
        if (props?.transaction)
            model = props.transaction.manager.getRepository(User);
        let options: FindManyOptions<User> = {
            relations: { role: true },
            select: {
                id: true,
                name: true,
                email: true,
                adress: {bairro: true, logradouro: true, numero: true},
                role: {
                    id: true,
                    name: true,
                },
            },
        };
        options = { ...options, ...tratarFindOptions<User>(props) };
        return model.find(options);
    }

    async delete({ id, transaction }: CommonPropsDelete) {
        const model = transaction.manager.getRepository(User);
        const user = this.model.findOne({ where: { id: id } });
        if (!user) {
            throw new RegistroNaoEncontradoException({
                coluna: 'id',
                valor: id,
            });
        }

        const deleted = await model.softDelete(id);
        if (deleted.affected) {
            return true;
        }
        return false;
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
