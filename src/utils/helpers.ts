import { FindManyOptions, In } from "typeorm";
import { CommonPropsFind } from "../common/common";

export const tratarFindOptions = <T>({ id, query = {} }: CommonPropsFind<T>) => {
  let options: FindManyOptions<T> = {};
  if (typeof id === 'number') {
    options.where = {...options.where, ...{id: id}};
  } else if (id) {
    options.where = {...options.where, ...{id: In(id)}};
  }
  options = { ...options, ...query };
  return options;
};