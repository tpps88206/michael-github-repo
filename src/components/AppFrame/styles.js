const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflowX: 'auto',
    backgroundColor: theme.palette.background.default,
    height: '100%',
    position: 'relative',
  },
  appBar: {
    boxShadow: 'none',
    zIndex: 1300,
    height: 72,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
});

export default styles;
