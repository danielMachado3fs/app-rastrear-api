import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
    CommonPropsBuscar,
    CommonPropsCriar,
    CommonPropsDeletar,
    CommonPropsEditar,
} from 'src/common/common';
import { USUARIO_REPOSITORY } from 'src/config/constants';
import { RegistroExistenteException } from 'src/exceptions/registro-existente.exception';
import { RegistroNaoEncontradoException } from 'src/exceptions/registro-inexistente.exception';
import { FindManyOptions, In, Like, Not, Repository } from 'typeorm';
import { tratarFindOptions } from '../../utils/helpers';
import { Usuario } from './entities/usuario.entity';
import {
    AlterarSenhaDto,
    CreateUsuarioDto,
    UpdateUsuarioDto,
} from './usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @Inject(USUARIO_REPOSITORY) private model: Repository<Usuario>,
    ) {}

    async criar({ body, transaction }: CommonPropsCriar<CreateUsuarioDto>) {
        const model = transaction.manager.getRepository(Usuario);
        const exist = model.findOne({ where: { email: body.email } });
        if (exist) {
            throw new RegistroExistenteException({
                coluna: 'email',
                valor: body.email,
            });
        }
        //CRIPTOGRAFA A SENHA DO USUÁRIO PARA SALVAR NO BANCO
        const salt = await bcrypt.getSalt();
        const senha = await bcrypt.hash(body.senha, salt);
        body.senha = senha;
        return model.save(body);
    }

    async editar({
        id,
        body,
        transaction,
    }: CommonPropsEditar<UpdateUsuarioDto>) {
        const model = transaction.manager.getRepository(Usuario);
        const usuario = model.findOne({ where: { id: id } });
        if (!usuario) {
            throw new RegistroNaoEncontradoException({
                coluna: 'id',
                valor: id,
            });
        }

        //VERIFICAR SE EXISTE ALGUM OUTRO USUÁRIO COM EMAIL INFORMADO
        const usuarioExistente = model.findOne({
            where: { email: Like(body.email), id: Not(In([id])) },
        });
        if (usuarioExistente) {
            throw new RegistroExistenteException({
                coluna: 'email',
                valor: body.email,
            });
        }

        //VERIFICAR SE MUDOU A SENHA, SE SIM, CRIPTOGRAFAR A NOVA SENHA
        if (body?.senha) {
            const salt = await bcrypt.getSalt();
            const senha = await bcrypt.hash(body.senha, salt);
            body.senha = senha;
        }
        return model.save({ ...usuario, ...body });
    }

    async buscar(props: CommonPropsBuscar<Usuario> & { id: number }) {
        let model = this.model;
        if (props?.transaction)
            model = props.transaction.manager.getRepository(Usuario);
        let opcoes: FindManyOptions<Usuario> = {
            relations: { grupo: true },
            select: {
                id: true,
                nome: true,
                email: true,
                grupo: {
                    id: true,
                    nome: true,
                    permissoes: true,
                },
                updatedAt: true,
                createdAt: true,
                deletedAt: true,
            },
        };
        opcoes = { ...opcoes, ...tratarFindOptions<Usuario>(props) };
        return model.findOne(opcoes);
    }

    async listar(props: CommonPropsBuscar<Usuario>) {
        let model = this.model;
        if (props?.transaction)
            model = props.transaction.manager.getRepository(Usuario);
        let opcoes: FindManyOptions<Usuario> = {
            relations: { grupo: true },
            select: {
                id: true,
                nome: true,
                email: true,
                grupo: {
                    id: true,
                    nome: true,
                },
            },
        };
        opcoes = { ...opcoes, ...tratarFindOptions<Usuario>(props) };
        return model.find(opcoes);
    }

    async deletear({ id, transaction }: CommonPropsDeletar) {
        const model = transaction.manager.getRepository(Usuario);
        const usuario = this.model.findOne({ where: { id: id } });
        if (!usuario) {
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

    async alterarSenha(
        props: CommonPropsEditar<AlterarSenhaDto>,
    ): Promise<boolean> {
        const model = props.transaction.manager.getRepository(Usuario);
        const usuario = await model.findOne({ where: { id: props.id } });
        if (!usuario)
            throw new RegistroNaoEncontradoException({
                coluna: 'id',
                valor: props.id,
            });
        const salt = await bcrypt.genSalt();
        const senha = await bcrypt.hash(props.body.senha, salt);
        await model.update({ id: props.id }, { senha });
        return true;
    }
}
