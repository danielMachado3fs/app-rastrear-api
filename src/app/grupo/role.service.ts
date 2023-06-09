import { Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import {
    CommonPropsCreate,
    CommonPropsDelete,
    CommonPropsFind,
    CommonPropsUpdate,
} from '../../common/common';
import { ROLE_REPOSITORY } from '../../config/constants';
import { RegistroNaoEncontradoException } from '../../exceptions/registro-inexistente.exception';
import { tratarFindOptions } from '../../utils/helpers';
import { Role } from './entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';

@Injectable()
export class RoleService {
    constructor(@Inject(ROLE_REPOSITORY) private model: Repository<Role>) {}

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

    async seed(){
    const rolesJson = require("../../config/seed/data/roles.json");
    const roles = await Promise.all(rolesJson.map(async (v) => {
        await this.model.save(v);
    }))
    return roles;
    }
}
