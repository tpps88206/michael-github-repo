import isEmpty from 'lodash/isEmpty';
import split from 'lodash/split';
import upperCase from 'lodash/upperCase';

export const generateAvatarCharacter = fullName => {
  if (!fullName) {
    return '';
  }
  const repoName = split(fullName, '/', 2);
  if (repoName.length > 1) {
    return upperCase(repoName[1].substring(0, 1));
  }
  return upperCase(repoName[0].substring(0, 1));
};

export const generateQueryParams = params => {
  let result = '';
  if (isEmpty(params)) {
    return result;
  }

  params.forEach((param, index) => {
    if (index > 0) {
      result = result + '&';
    }
    result = result + param.key + '=' + param.value;
  });
  return result;
};
