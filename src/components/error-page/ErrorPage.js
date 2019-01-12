import React from 'react';
import Icon from '@material-ui/core/Icon';
import './ErrorPage.css';

/**
 * ErrorPage component
 * Stateful
 */
class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  //Hook to catch the unhandled errors
  static getDerivedStateFromError(error) {
     return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">     
          <Icon className="error-icon">error_outline</Icon>     
          <h1>            
            Something went wrong. Please try again later.
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorPage;