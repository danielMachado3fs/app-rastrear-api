import { Inject, Injectable } from '@nestjs/common';
import {
    CommonPropsCreate,
    CommonPropsDelete,
    CommonPropsFind,
    CommonPropsUpdate,
} from 'src/common/common';
import { GRUPO_REPOSITORY } from 'src/config/constants';
import { RegistroNaoEncontradoException } from 'src/exceptions/registro-inexistente.exception';
import { FindManyOptions, Repository } from 'typeorm';
import { tratarFindOptions } from '../../utils/helpers';
import { Role } from './entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';

@Injectable()
export class RoleService {
    constructor(@Inject(GRUPO_REPOSITORY) private model: Repository<Role>) {}

    async create({ body, transaction }: CommonPropsCreate<CreateRoleDto>) {
        const model = transaction.manager.getRepository(Role);

        return model.save(body);
    }

    async update({ id, body, transaction }: CommonPropsUpdate<UpdateRoleDto>) {
        const model = transaction.manager.getRepository(Role);
        const role = model.findOne({ where: { id: id } });
        if (!role) {
            throw new RegistroNaoEncontradoException({
                coluna: 'id',
                valor: id,
            });
        }

        return model.save({ ...role, ...body });
    }

    async findOne(props: CommonPropsFind<Role> & { id: number }) {
        let model = this.model;
        if (props?.transaction)
            model = props.transaction.manager.getRepository(Role);
        let options: FindManyOptions<Role> = {};
        options = { ...options, ...tratarFindOptions<Role>(props) };
        return model.findOne(options);
    }

    async findAll(props: CommonPropsFind<Role>) {
        let model = this.model;
        if (props?.transaction)
            model = props.transaction.manager.getRepository(Role);
        let options: FindManyOptions<Role> = {};
        options = { ...options, ...tratarFindOptions<Role>(props) };
        return model.find(options);
    }

    async deletear({ id, transaction }: CommonPropsDelete) {
        const model = transaction.manager.getRepository(Role);
        const role = this.model.findOne({ where: { id: id } });
        if (!role) {
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
