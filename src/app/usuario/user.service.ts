import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FindManyOptions, In, Like, Not, Repository } from 'typeorm';
import {
    CommonPropsCreate,
    CommonPropsDelete,
    CommonPropsFind,
    CommonPropsUpdate,
} from '../../common/common';
import { RegistroExistenteException } from '../../exceptions/registro-existente.exception';
import { RegistroNaoEncontradoException } from '../../exceptions/registro-inexistente.exception';
import { tratarFindOptions } from '../../utils/helpers';
import { User } from './entities/user.entity';
// import * as users from '../../config/seed/data/users.json'
import { USER_REPOSITORY } from '../../config/constants';
import { RoleService } from '../grupo/role.service';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY) private model: Repository<User>,
        // @InjectRepository(User) private model: Repository<User>,
        @Inject(RoleService) private roleService: RoleService,
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
                address: {neighborhoods: true, street: true, number: true},
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

    async seed(){
        const users = require("../../config/seed/data/users.json");
        await Promise.all(users.map(async (u) => {
            const role = await this.roleService.findOne({id: u.roleId});
            delete u.roleId;
            u.role = role;
            await this.model.save(u);
        }))
    }
}
