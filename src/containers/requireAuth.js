import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function (ComposedComponent) {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.auth) {
        this.props.history.push('/user/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.props.history.push('/user/signin');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = state => (
    {
      auth: state.auth.authenticated,
    }
  );

  return connect(mapStateToProps, null)(RequireAuth);
}
