import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { closeFormDialogue, saveFood } from './../../actions/form.action';
import './FoodForm.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'column'
  },
  body: {
    width: '300px',
    paddingTop: '0 !important',
    paddingBottom: 0
  },
  formControl: {
    marginTop: '8px',
    marginBottom: '4px',
    width: '100%',
  },
});

//Initial state constant
const initialState = {
  _id: '',
  name: '',
  course: '',
  cuisines: '',
  category: '',
  price: '',
  status: true,
  formErrors: {}
}

/**
 * FoodForm component
 * Stateful
 * Connected component
 */
class FoodForm extends React.Component {

  //Setting the initial state
  componentWillMount() {
    this.setState({ ...initialState });
  }

  //hook to update the state once props has changed
  componentWillReceiveProps(nextProps) {
    if(nextProps.formData && nextProps.formData._id) {
      this.setState({
        name: nextProps.formData.name,
        course: nextProps.formData.course,
        cuisines: nextProps.formData.cuisines,
        category: nextProps.formData.category,
        price: nextProps.formData.price,
        status: nextProps.formData.status? true: false,
        _id: nextProps.formData._id
      });
    } else {
      this.setState({ ...initialState });
    }
  }

  //function to handle change event
  handleChange = name => event => {
    if(name !== 'status') {
      this.setState({ 
        [name]: event.target.value, 
        formErrors: {
          ...this.state.formErrors,
          [name]: false
        }
      });
    } else {
      this.setState({ [name]: event.target.checked });
    }
  };

  //function to close popup
  handleClose = () => {
    this.props.closeFormDialogue();
  };

  //function to save data
  save = (method, event) => {
    event.preventDefault();
    const status = this.handleValidation();
    if(status) {
      const payLoad = { ...this.state };
      delete payLoad.formErrors;
      this.props.saveFood(payLoad, method);
    } else {
      this.props.showFormValidation();
    }
  }

  //function to handle form validations
  handleValidation = () => {
    const formElem = JSON.parse(JSON.stringify(initialState));
    const keys = Object.keys(this.state);

    keys.forEach(value => {
      switch(value) {
        case 'name': if(!this.state.name) {
                        formElem.formErrors.name = true;
                      }
        break;
        case 'course': if(!this.state.course) {
                        formElem.formErrors.course = true;
                      }
        break;
        case 'cuisines': if(!this.state.cuisines) {
                          formElem.formErrors.cuisines = true;
                        }
        break;
        case 'category': if(!this.state.category) {
                          formElem.formErrors.category = true;
                        }
        break;
        case 'price': if(!this.state.price) {
                        formElem.formErrors.price = true;
                      }
        break;
        default: break;
      }
    });
    
    if(JSON.stringify(formElem.formErrors) !== JSON.stringify(initialState.formErrors)) {
      this.setState({formErrors: formElem.formErrors});
      return false;
    }
    return true;
  }

  render() {

    //destructing classes
    const { classes } = this.props;
    const title = this.props.formData._id? 'UPDATE FOOD': 'ADD NEW FOOD';

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title" 
        >
          <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
          <form name="foodForm" className={classes.root} autoComplete="off" 
            onSubmit={
              this.state._id?  e => {this.save('patch', e)}: e => {this.save('post', e)}                
            } 
            noValidate >
            <DialogContent className={classes.body}>            
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                value={this.state.name}
                onChange={this.handleChange('name')} 
                required 
                error={this.state.formErrors.name}
              />
              <FormControl className={classes.formControl} 
                required 
                error={this.state.formErrors.course}>
                <InputLabel htmlFor="course">Course</InputLabel>
                <Select
                  value={this.state.course}
                  onChange={this.handleChange('course')}
                  input={<Input id="course" />} 
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Starter">Starter</MenuItem>
                  <MenuItem value="Main Dish">Main Dish</MenuItem>
                  <MenuItem value="Dessert">Dessert</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} 
                required 
                error={this.state.formErrors.category}>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  value={this.state.category}
                  onChange={this.handleChange('category')}
                  input={<Input id="category" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Veg">Veg</MenuItem>
                  <MenuItem value="Non Veg">Non Veg</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} 
                required 
                error={this.state.formErrors.cuisines}>
                <InputLabel htmlFor="cuisine">Cuisine</InputLabel>
                <Select
                  value={this.state.cuisines}
                  onChange={this.handleChange('cuisines')}
                  input={<Input id="cuisine" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="American">American</MenuItem>
                  <MenuItem value="Chinese">Chinese</MenuItem>
                  <MenuItem value="Indian">Indian</MenuItem>
                  <MenuItem value="Italian">Italian</MenuItem>
                  <MenuItem value="Japanese">Japanese</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                value={this.state.price}
                onChange={this.handleChange('price')} 
                required 
                error={this.state.formErrors.price}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.status}
                    onChange={this.handleChange('status')}
                    color="primary"
                  />
                }
                label="Available"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>          
          </form>
        </Dialog>
      </div>
    );
  }
}

//mapping state from store to component props
const mapStateToProps = state => {
  return {
    open: state.form.open,
    formData: state.form.data? state.form.data: []
  }
};

//mapping dispatch method to props
const mapDispatchToProps = dispatch => {
  return {
    closeFormDialogue: () => dispatch(closeFormDialogue()),
    saveFood: (data, method) => dispatch(saveFood(data, method)),
    showFormValidation: () => dispatch({
        type: 'OPEN_NOTIFICATION',
        data: { open: true, category: 'warning', message: 'All fields are required' }     
      } 
    ),
  }
}

//Exporting HOC connect and withstyles
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FoodForm));
