import React, { Component } from 'react';
import { connect } from 'react-redux';

import UnlockAccount from './containers/UnlockAccount';
import AccountInfo from './containers/AccountInfo';

class App extends Component {

  render() {

    const unlockAccountPart = <UnlockAccount />;
    const interfacePart = <div>
      <AccountInfo />
    </div>;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Ether Interface</h1>
        </header>
        {this.props.web3 
          ? interfacePart
          : unlockAccountPart
        }
      </div>
    );
  }
}

function mapStateToProps({web3}){
  return { web3 };
}

export default connect(mapStateToProps, null)(App);
