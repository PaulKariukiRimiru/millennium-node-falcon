import { MongoClient as mongo} from 'mongodb';
import { Either, right, left } from 'fp-ts/lib/Either';

const url = "mongodb://localhost:27017";

let connectionResult: Either<string, mongo>;

export const connectDB = async (): Promise<Either<string, string>> => {
  try {
    const connection = await mongo.connect(url, { useNewUrlParser: true });
    connectionResult = right(connection);

    return right('connected successfully');
  } catch (error) {
    return left(error.message());
  }
}

export const getConnectionClient = (): Either<string, mongo> => connectionResult;

export const getDatabase = (database: string) => {
  if (connectionResult.isRight()) {
    return connectionResult.value.db(database);
  }

  throw Error('Database client not found or configured');
};
