import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '11495',
  entities: [User],
  synchronize: true,
  schema: 'public',
};

export default ormConfig;
