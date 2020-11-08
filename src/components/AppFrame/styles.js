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
    backgroundColor: 'white',
    height: '100%',
    position: 'relative',
  },
  appBar: {
    boxShadow: 'none',
    zIndex: 1300,
    height: 72,
  },
});

export default styles;
