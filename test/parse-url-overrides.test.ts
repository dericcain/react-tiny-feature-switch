import { parseUrlOverrides } from '../src/parse-url-overrides';

describe('parseUrlOverrides', () => {
  it('should parse URL search params into an object', () => {
    expect(parseUrlOverrides('?foo1=true&bar1=false&foo2=1&bar2=0&random=blah')).toMatchObject({
      foo1: true,
      bar1: false,
      foo2: true,
      bar2: false,
      random: false,
    });
  });
});
