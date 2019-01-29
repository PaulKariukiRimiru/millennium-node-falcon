import { application } from './app';

export const server = application.listen(8081, () => {
  console.log('all engines are warming on port 8081');
});
