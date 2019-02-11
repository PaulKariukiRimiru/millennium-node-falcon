import { MongoClient as mongo} from 'mongodb';
import { Either, right, left } from 'fp-ts/lib/Either';
import { dbName, dbUrl } from '../../pre-dev-start';

let connectionResult: Either<string, string>;
let database;
let connection;

export const connectDB = async (): Promise<Either<string, string>> => {
  try {
    connection = await mongo.connect(dbUrl!, { useNewUrlParser: true });
    database = await connection.db(dbName);

    connectionResult = right('database connected');

    return right('connected successfully');
  } catch (error) {
    console.log(error.message);
    return left(error.message);
  }
}

export const isClientConnected = (): Either<string, string> => connectionResult;

export const getConnection = () => {
  if (connection) {
    return connection;
  }

  throw Error('Database client not connected');
}

export const getDatabase = () => {
  if (database) {
    return database;
  }

  throw Error('Database client not found or configured');
};

export const tearDown = async () => {
  database.dropDatabase(() => {
    connection.close();
  });
};
