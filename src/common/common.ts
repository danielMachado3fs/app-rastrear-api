import { FindManyOptions, QueryRunner } from "typeorm";

export interface CommonProps {
  transaction: QueryRunner;
}

export interface CommonPropsCreate<T> extends CommonProps {
  body: T;
}

export interface CommonPropsDelete extends CommonProps {
  id: number
}

export interface CommonPropsUpdate<T> extends CommonProps {
  id: number;
  body: T;
}

export interface CommonPropsFind<T> extends Partial<CommonProps>{
  id?: number | number[];
  query?: FindManyOptions<T>;
}