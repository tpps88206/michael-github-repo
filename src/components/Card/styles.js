const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 12,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  },
});

export default styles;
