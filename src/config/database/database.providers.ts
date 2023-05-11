import { Grupo } from 'src/app/grupo/entities/grupo.entity';
import { Usuario } from 'src/app/usuario/entities/usuario.entity';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../constants';

let config: any;
if (process.env.NODE_ENV != 'test') {
  config = {
    database: 'app_scf',
    type: 'mariadb',
    username: 'root',
    password: '',
    host: 'localhost',
    port: 3306,
    entities: [Usuario, Grupo],
    // entities: [__dirname + '/src/**/*.entity.{js,ts}'],
    // migrations: [__dirname + '/src/**/*.migrations{.ts,.js}'],
    // database: process.env.DATABASE_NAME,
    // type: process.env.DATABASE_TYPE,
    // username: process.env.DATABASE_USERNAME,
    // password: '',
    // host: process.env.DATABASE_HOST,
    // port: Number(process.env.PORT),
    // entities: [__dirname + process.env.ENTITIES],
    // migrations: [__dirname + process.env.MIGRATIONS],
    sincronize: true,
  };
}

export const connectionSource = new DataSource(config);

//inicialisa a conecção com o banco de dados e exporta o provider DATA_SOURCE que será provido
//pelo modulo databaseModule, que por ser globai, esse DATA_SOURCE poderá ser usado em qualquer lugar
export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      return connectionSource.initialize()
        // .then(() => {
        //   // console.log(connectionSource);
        //   return connectionSource;
        // })
        // .catch((err) => {
        //   console.error('Erro durante a inicialização do DataSource', err);
        // });
    },
  },
];
