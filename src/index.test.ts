import { home } from './';

describe('Milleneuim node falcon', () => {
  it('loads without failing', () => {
    expect(home()).toEqual('hello node');
  });
});
