import { application } from './app';
import { connectDB } from './db/index';

export const server = application.listen(8081, async () => {
  console.log('creating database connection');
  const dbStatus = await connectDB();

  if(dbStatus.isLeft()) {
    throw Error('Database failed to load')
  }

  console.log('all engines running on port 8081');
});
