import React, { Component } from 'react';
import Login from './Components/Login/login';
import Home from './Components/Home/home'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogedIn: false,
      userName: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
}
login(data){
  this.setState({
    userName: data.name,
    isLogedIn: true
  })
}
logout(data){
    this.setState({
      userName: null,
      isLogedIn: false
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title">Reporting Dashboard</span>
    {this.state.userName  && <span className="logout"
        onClick={this.logout}
        >Logout</span> }
        </header>
       {!this.state.isLogedIn  && <Login onLogin={this.login}/>} 
       {this.state.isLogedIn  && <Home name={this.state.userName}/>} 
      </div>
    );
  }
}

export default App;

