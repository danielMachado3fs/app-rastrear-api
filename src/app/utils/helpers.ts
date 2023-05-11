import { CommonPropsBuscar } from "src/common/common";
import { FindManyOptions, In } from "typeorm";

export const tratarFindOptions = <T>({ id, query = {} }: CommonPropsBuscar<T>) => {
  let options: FindManyOptions<T> = {};
  if (typeof id === 'number') {
    options.where = {...options.where, ...{id: id}};
  } else if (id) {
    options.where = {...options.where, ...{id: In(id)}};
  }
  options = { ...options, ...query };
  return options;
};