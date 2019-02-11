import { connectDB, getDatabase, tearDown } from './index';

describe('Mongo Database integration', () => {
  let db;

  beforeAll(async () => {
    await connectDB();
    db = getDatabase();
  });

  afterAll(async () => {
    await tearDown();
  });

  it('should aggregate docs from collection', async () => {
    const files = db.collection('files');

    await files.insertMany([
      {type: 'Document'},
      {type: 'Video'},
      {type: 'Image'},
      {type: 'Document'},
      {type: 'Image'},
      {type: 'Document'}
    ]);

    const topFiles = await files
      .aggregate([{$group: {_id: '$type', count: {$sum: 1}}}, {$sort: {count: -1}}])
      .toArray();

    expect(topFiles).toEqual([
      {_id: 'Document', count: 3},
      {_id: 'Image', count: 2},
      {_id: 'Video', count: 1}
    ]);
  });
});