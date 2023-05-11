import { FindManyOptions, QueryRunner } from "typeorm";

export interface CommonProps {
  transaction: QueryRunner;
}

export interface CommonPropsCriar<T> extends CommonProps {
  body: T;
}

export interface CommonPropsDeletar extends CommonProps {
  id: number
}

export interface CommonPropsEditar<T> extends CommonProps {
  id: number;
  body: T;
}

export interface CommonPropsBuscar<T> extends Partial<CommonProps>{
  id: number | number[];
  query?: FindManyOptions<T>;
}