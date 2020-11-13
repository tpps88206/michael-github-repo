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
