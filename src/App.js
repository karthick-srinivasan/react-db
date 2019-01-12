import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './AuthRoutes';
import LinearProgress from '@material-ui/core/LinearProgress';
import Navbar from './components/navbar/Navbar';
import Notification from './components/notification/Notification';
import Home from './components/home/Home';
import FoodList from './components/food-list/FoodList';
import ErrorPage from './components/error-page/ErrorPage';
import './App.css';

//Customizing the Material UI theme
const theme = createMuiTheme({
  palette: {
    primary: { main: '#228b22' },
    secondary: { main: '#292a2b' },
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    const loader = this.props.loader? <LinearProgress />: null;
    return (
      <MuiThemeProvider theme={theme}>        
        <BrowserRouter>
          <div className="App">
            <Navbar />
            { loader }
            <div className="page-container">
              <ErrorPage>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <ProtectedRoute path='/food-list' component={FoodList} />
                  <Route render={() => <Redirect to="/" />} />
                </Switch>
              </ErrorPage>
            </div>
            <Notification />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader.isLoading
  }
};

export default connect(mapStateToProps)(App);
