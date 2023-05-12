import { Inject, Injectable } from '@nestjs/common';
import {
    CommonPropsBuscar,
    CommonPropsCriar,
    CommonPropsDeletar,
    CommonPropsEditar,
} from 'src/common/common';
import { GRUPO_REPOSITORY } from 'src/config/constants';
import { RegistroNaoEncontradoException } from 'src/exceptions/registro-inexistente.exception';
import { FindManyOptions, Repository } from 'typeorm';
import { tratarFindOptions } from '../../utils/helpers';
import { CreateGrupoDto, UpdateGrupoDto } from './create-grupo.dto';
import { Grupo } from './entities/grupo.entity';

@Injectable()
export class GrupoService {
    constructor(@Inject(GRUPO_REPOSITORY) private model: Repository<Grupo>) {}

    async criar({ body, transaction }: CommonPropsCriar<CreateGrupoDto>) {
        const model = transaction.manager.getRepository(Grupo);

        return model.save(body);
    }

    async editar({ id, body, transaction }: CommonPropsEditar<UpdateGrupoDto>) {
        const model = transaction.manager.getRepository(Grupo);
        const grupo = model.findOne({ where: { id: id } });
        if (!grupo) {
            throw new RegistroNaoEncontradoException({
                coluna: 'id',
                valor: id,
            });
        }

        return model.save({ ...grupo, ...body });
    }

    async buscar(props: CommonPropsBuscar<Grupo> & { id: number }) {
        let model = this.model;
        if (props?.transaction)
            model = props.transaction.manager.getRepository(Grupo);
        let opcoes: FindManyOptions<Grupo> = {};
        opcoes = { ...opcoes, ...tratarFindOptions<Grupo>(props) };
        return model.findOne(opcoes);
    }

    async listar(props: CommonPropsBuscar<Grupo>) {
        let model = this.model;
        if (props?.transaction)
            model = props.transaction.manager.getRepository(Grupo);
        let opcoes: FindManyOptions<Grupo> = {};
        opcoes = { ...opcoes, ...tratarFindOptions<Grupo>(props) };
        return model.find(opcoes);
    }

    async deletear({ id, transaction }: CommonPropsDeletar) {
        const model = transaction.manager.getRepository(Grupo);
        const grupo = this.model.findOne({ where: { id: id } });
        if (!grupo) {
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
}
