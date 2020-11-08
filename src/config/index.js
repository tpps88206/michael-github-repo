const FLAVOR = process.env.REACT_APP_FLAVOR || 'dev';

module.exports = {
  common: require(`./${FLAVOR}/common.json`),
};
