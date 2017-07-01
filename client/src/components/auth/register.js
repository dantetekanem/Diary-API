import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router";
import { registerUser } from "../../actions/auth";
import validate from "./validations/validate-register";
import { renderField } from "../../helpers/form-helper";

const form = reduxForm({
  form: "register",
  validate
});

class Register extends Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div className="row">
          <div className="col-md-6">
            <Field name="firstName" label="First Name" className="form-control" component={renderField} type="text" />
            <br />
          </div>
          <div className="col-md-6">
            <Field name="lastName" label="Last Name" className="form-control" component={renderField} type="text" />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Field name="email" label="E-mail" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <Field name="password" label="Password" className="form-control" component={renderField} type="password" />
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Register</button> Already have an account? <Link to="/login">Sign in here</Link>.
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { registerUser })(form(Register));
