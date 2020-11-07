export default theme => ({
  '.color-white': {
    color: '#ffffff',
  },
  '.color-black': {
    color: '#000000',
  },
  '.color-primary': {
    color: theme.palette.primary.main,
  },
  '.color-error': {
    color: theme.palette.error.main,
  },
  '.color-success': {
    color: theme.palette.success.main,
  },
  '.color-warning': {
    color: theme.palette.warning.main,
  },
  '.color-info': {
    color: theme.palette.info.main,
  },
  '.color-text-primary': {
    color: theme.palette.text.primary,
  },
  '.color-text-secondary': {
    color: theme.palette.text.secondary,
  },
});
