import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './Home.css';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  button: {
    fontSize: '1.4rem'
  }
};

/**
 * Home component
 * Stateful
 */
class Home extends Component {
  //intializing state
  state = {
    value: 'mongo'
  };

  //Hook to set selected db value
  componentDidMount() {
    const selectedDB = sessionStorage.getItem('db');
    const db = selectedDB? selectedDB: 'mongo';
    this.setState({value: db});
  }

  //function to handle radio button change event
  handleChange = event => {
    this.setState({value: event.target.value});
  }

  //function for redirect current page to food list page
  continue = () => {
    sessionStorage.setItem('db', this.state.value);
    this.props.history.push('/food-list');
  }

  render() {
    const { classes } = this.props;
    return(
      <div className="container">
        <span>Mongo DB</span>
        <Radio
          checked={this.state.value === 'mongo'}
          onChange={this.handleChange}
          value="mongo"
          name="db"
          id="mongo"
          aria-label="mongo"
          classes={{
            root: classes.root,
            checked: classes.checked,
          }}
        />
        <span>MySQL DB</span>
        <Radio
          checked={this.state.value === 'mysql'}
          onChange={this.handleChange}
          value="mysql"
          name="db" 
          id="mysql"
          aria-label="mysql"
          classes={{
            root: classes.root,
            checked: classes.checked,
          }}
        />
        <br />
        <Button variant="contained" color="primary" className={classes.button} onClick={this.continue}>
          Continue &nbsp;&nbsp;
          <Icon>send</Icon>
        </Button>
      </div>
    );
  }
}

//Home component proptypes
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

//Exporting withStyles HOC
export default withStyles(styles)(Home);