import React, { Component } from "react";
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTemplate logo="Diary APP" />

        <div className="container app-body">
          {this.props.children}
        </div>

        <FooterTemplate />
      </div>
    );
  }
}

export default App;