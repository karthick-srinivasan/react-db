import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import { retrieveFood } from './../../actions/retrieveFood.action';
import { openFormDialogue, editFormDialogue } from './../../actions/form.action';
import { deleteFood } from './../../actions/deleteFood.action';
import FoodForm from './../food-form/FoodForm';
import './FoodList.css';

//CustomTableCell component
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f3f40',
    color: theme.palette.common.white,
    fontSize: 16,
    textAlign: 'left',
    borderBottom: 'none'
  },
  body: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 500,
    color: theme.palette.common.white,
    borderBottom: 'none',
  },
}))(TableCell);

//Declaring styles for FoodList component element
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: '10px',
    overflowX: 'auto',
    backgroundColor: '#6d6c6c',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: '#615f5f',
    },
    '&:nth-of-type(odd)': {
      backgroundColor: '#6d6c6c',
    },
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  loading: {
    backgroundColor: '#6d6c6c',
    color: '#fff'
  }
});

/**
 * FoodList component
 * Stateful
 * connected component
 */
class FoodList extends React.Component {

  componentDidMount() {
    this.props.retrieveFood();
  }

  //function to open add form dialogue
  openFormDialogue = () => {
    this.props.openFormDialogue()
  }
  
  //function to call delete service
  delete = id => {
    this.props.deleteFood(id);
  }

  //function to open edit form dialogue
  edit = row => {
    this.props.editFormDialogue(row);
  }

  render() {
    //destructing classes from props
    const { classes } = this.props;
    let food;
    if(!this.props.isLoading) {
      if(this.props.rows.length) {
        food = this.props.rows.map(row => {
          let statusChip;
          if(row.status) {
            statusChip = <Chip label="Available" style={{width: '100px', backgroundColor: 'rgb(1, 156, 1)', color: '#fff'}}/>
          } else {
            statusChip = <Chip label="Not Available" style={{width: '100px', backgroundColor: 'rgb(234, 16, 0)', color: '#fff'}}/>
          }
          return (
            <TableRow className={classes.row} key={row._id}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell numeric><div>{row.course}</div></CustomTableCell>
              <CustomTableCell numeric><div>{row.category}</div></CustomTableCell>
              <CustomTableCell numeric><div>{row.cuisines}</div></CustomTableCell>
              <CustomTableCell numeric><div>$ {row.price}</div></CustomTableCell>
              <CustomTableCell numeric>
                <div> {statusChip} </div>
              </CustomTableCell>
              <CustomTableCell numeric>
                <Button variant="fab" mini color="secondary" aria-label="edit" className={classes.button} onClick={e => {this.edit(row)}}>
                  <Icon>edit</Icon>
                </Button>
                <Button variant="fab" mini color="secondary" aria-label="delete" className={classes.button} onClick={e => {this.delete(row._id)}}>
                  <Icon>delete</Icon>
                </Button>
              </CustomTableCell>
            </TableRow>
          );
        });
      } else {
        food = <TableRow className={classes.loading}>
          <CustomTableCell>No records found.</CustomTableCell>
        </TableRow>
      }
    } else {
      food = <TableRow className={classes.loading}>
          <CustomTableCell>Loading...</CustomTableCell>
        </TableRow>
    }
    return (
      <React.Fragment>
        <div className="food-container">
          <div className="title">Food menu</div>
          <Tooltip title="Add New" placement="right">
            <Button variant="fab" aria-label="add" color="primary" onClick={this.openFormDialogue} id="add" type="button">
              <Icon style={{color: '#fff'}}>add</Icon>
            </Button>
          </Tooltip>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Food Name</CustomTableCell>
                  <CustomTableCell numeric>Course</CustomTableCell>
                  <CustomTableCell numeric>Category</CustomTableCell>
                  <CustomTableCell numeric>Cuisine</CustomTableCell>
                  <CustomTableCell numeric>Price</CustomTableCell>
                  <CustomTableCell numeric>Status</CustomTableCell>
                  <CustomTableCell numeric>
                    {/*<Button variant="fab" mini aria-label="add" className={classes.button}>
                      <Icon>add</Icon>
                    </Button>*/}
                  </CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { food }
              </TableBody>
            </Table>
          </Paper>        
        </div>
        <FoodForm />
      </React.Fragment>
    );
  }
}

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
};

//mapping state from store to component props
const mapStateToProps = (state) => {
  return {
    rows: state.food? state.food.foodList: [],
    isLoading: state.loader.isLoading
  }
};

//mapping dispatch method to props
const mapDispatchToProps = (dispatch) => {
  return {
    retrieveFood: () => dispatch(retrieveFood()),
    openFormDialogue: () => dispatch(openFormDialogue()),
    editFormDialogue: (row) => dispatch(editFormDialogue(row)),
    deleteFood: (id) => dispatch(deleteFood(id))
  }
};

//Exporting FoodList from HOC connect and withstyles
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FoodList));