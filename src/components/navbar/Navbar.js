import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import './Navbar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  avatar: {
    margin: 10,
  },
  edit: {
    cursor: 'pointer'
  }
};

/**
 * Navbar component
 * Stateless
 */
const Navbar = (props) => {
  const { classes } = props;
  const img = sessionStorage.getItem('db');
  const imgURL = `/assets/${img}.png`;
  
  //changeDB function to redirect to DB selection page
  const changeDB = () => {
    window.location.href = '/';
  }

  const button = (props.location.pathname !== '/' && img)? 
    <React.Fragment>
      <Tooltip title={img}>
        <Avatar alt={img} src={imgURL} className={classes.avatar} />
      </Tooltip>
      <Tooltip title="Change DB" onClick={changeDB}>
        <Icon className={classes.edit}>360</Icon>
      </Tooltip>
    </React.Fragment>: 
    null;
  
  return(
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={classes.grow}>
              React <Icon>swap_horiz</Icon> DB
          </Typography>
          { button }
        </Toolbar>
      </AppBar>
    </div>
  );
}

//Declaring Navbar proptypes
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Navbar));