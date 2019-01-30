import { Db, Collection } from 'mongodb';

export const makeSampleTable = async (db: Db, tableName: string): Promise<Collection> => {
  const users = await db.collection(tableName);
  await users.insertOne({name: 'paul'});

  return users;
}

export const getSampleData = async (db: Collection) => {
  return await db.find().toArray();
}
