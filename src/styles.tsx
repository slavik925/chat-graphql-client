import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  title: {
    flexGrow: 1,
  },
  grid: {
    height: '100%',
    marginLeft: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));