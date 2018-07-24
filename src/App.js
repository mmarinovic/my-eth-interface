import React, { Component } from 'react';
import { connect } from 'react-redux';

import UnlockAccount from './containers/UnlockAccount';
import AccountInfo from './containers/AccountInfo';
import NewTransaction from './containers/NewTransaction';
import TokenList from './containers/TokenList';

class App extends Component {

  render() {
    const unlockAccountPart = <UnlockAccount />;
    const interfacePart = (<div>
      <div className="col-md-6">
        <h3>Send Ether or Token</h3>
        <NewTransaction/>
      </div>
      <div className="col-md-6">
        <h3>Account info</h3>
        <AccountInfo />
        <br />
        <TokenList />
      </div>
    </div>);

    return (
      <div className="App">
        {this.props.web3 && this.props.accounts && this.props.accounts.selected
          ? interfacePart
          : unlockAccountPart
        }
      </div>
    );
  }
}

function mapStateToProps({web3, accounts}){
  return { web3, accounts};
}

export default connect(mapStateToProps, null)(App);
