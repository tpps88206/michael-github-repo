const styles = theme => ({
  root: {
    margin: 12,
    height: 284,
  },
  '@media screen and (min-width: 1280px)': {
    root: {
      maxWidth: 600,
      minWidth: 400,
    },
  },
  '@media screen and (min-width: 480px) and (max-width: 1279px)': {
    root: {
      width: 400,
    },
  },
  '@media screen and (max-width: 479px)': {
    root: {
      width: 'calc(100vw - 24px)',
    },
  },
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  },
  description: {
    overflowY: 'auto',
    height: 44,
  },
  content: {
    height: 155,
  },
  starts: {
    lineHeight: '40px',
  },
  forks: {
    lineHeight: '40px',
  },
  language: {
    lineHeight: '40px',
  },
});

export default styles;
