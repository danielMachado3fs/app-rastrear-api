import { HttpException, HttpStatus } from '@nestjs/common';

export class RegistroExistenteException extends HttpException {
  constructor(props: {coluna: string, valor: any, descricao?: string}) {
    let descricao = 'Registro';
    if(props?.descricao) descricao = props?.descricao;
    super(`${descricao} com ${props.coluna} = ${props.valor} ja existe`, HttpStatus.CONFLICT);
  }
}
