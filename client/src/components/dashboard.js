import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/auth";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
const user = cookie.get("user");

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.props.protectedTest();
  }

  renderContent() {
    if(this.props.content) {
      return (
        <p>Welcome to your Personal Diary, <b>{this.props.user.firstName}</b>.</p>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content, user: user };
}

export default connect(mapStateToProps, actions)(Dashboard);
