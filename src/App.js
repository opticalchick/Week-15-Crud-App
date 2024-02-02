import React, { Component } from 'react';
import { UsersList } from './Components/UsersList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <UsersList props={{ test: data }} />
      </div>
    )
  }
}
