import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// TransitionUp Component
const TransitionUp = (props) => <Slide {...props} direction="up" />;

//Defining styles for Notification Component
const styles = theme => ({
  success: {
    backgroundColor: green[800],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.secondary.light,
  },
  warning: {
    backgroundColor: '#e68810',
  },
});
/**
 * Notification component
 * Stateful
 * connected component
 */
class Notification extends React.Component {
  state = {
    Transition: TransitionUp
  };

  //close handler
  close = () => {
    this.props.closeNotification();
  };

  render() {
    const { classes } = this.props;
    return(
      <Snackbar
        open={this.props.open}
        onClose={this.close}
        TransitionComponent={this.state.Transition} 
        autoHideDuration={5000}
      >
        <SnackbarContent 
          className={classes[this.props.type]} 
          message={
            <div className="display-flex">
              <Icon>{ this.props.type !== 'success'? this.props.type: 'thumb_up' }</Icon>
              &nbsp;&nbsp;
              <span style={{marginTop: '3px'}}>
                {this.props.message}
              </span>
            </div>
          }             
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.close}
            >
            <Icon>close</Icon>
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired
};

//mapping state from store to component props
const mapStateToProps = state => {
  return {
    open: state.notification.open? state.notification.open: false,
    type: state.notification.category,
    message: state.notification.message,
  };
};
//mapping dispatch method to props
const mapDispatchToProps = dispatch => {
  return {
    closeNotification: () => dispatch(
      {
        type: 'OPEN_NOTIFICATION', 
        data: { open: false }
      }
    ),
  }
}

//Exporting Notification from HOC connect and withstyles
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Notification));