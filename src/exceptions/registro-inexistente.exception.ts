/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class RegistroNaoEncontradoException extends HttpException {
  constructor(props: {coluna: string, valor: any, descricao?: string}) {
    let descricao = 'Registro';
    if(props?.descricao) descricao = props?.descricao;
    super(`${descricao} com ${props.coluna} = ${props.valor} não existe`, HttpStatus.NOT_FOUND);
  }
}
