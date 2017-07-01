import React, { Component } from 'react';
import { connect } from 'react-redux';

class FooterTemplate extends Component {
  render() {
    const d = new Date();
    const year = d.getFullYear();

    return (
      <footer>
        <hr/>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p className="copyright">© {year}, Diary APP. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(FooterTemplate);
