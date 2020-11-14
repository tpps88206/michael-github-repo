import { generateAvatarCharacter, generateQueryParams } from './index';

describe('test generateAvatarCharacter', () => {
  it('should return empty string', () => {
    expect(generateAvatarCharacter(null)).toEqual('');
  });

  it('should return correct character 1', () => {
    expect(generateAvatarCharacter('foo/bar')).toEqual('B');
  });

  it('should return correct character 2', () => {
    expect(generateAvatarCharacter('foo')).toEqual('F');
  });
});

describe('test generateQueryParams', () => {
  it('should return empty string', () => {
    expect(generateQueryParams(null)).toEqual('');
  });

  it('should return correct array result', () => {
    expect(
      generateQueryParams([
        {
          key: 'foo',
          value: 1,
        },
        {
          key: 'bar',
          value: 2,
        },
      ]),
    ).toEqual('foo=1&bar=2');
  });
});
