import React, { Component } from 'react';
import './App.css';
import ZipCode from './ZipCode.js';
import CitySearch from './CitySearch';;


function Welcome(props){
  return (
    <div className="App">
        <div className="App-header">
            <h2>Welcome</h2>
        </div>
        <form id="welcome">
          <button onClick={props.switch1}>Zip-Search</button>
          <button onClick={props.switch2}>City-Search</button>
        </form>
    </div>
  )
}



class App extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      welcomeComponent: <Welcome switch1={this.switch1} switch2={this.switch2}/>,
      component:<Welcome switch1={this.switch1} switch2={this.switch2}/>
    }
  }
  switch1 =()=> {
    this.setState({component:<ZipCode goBack={this.goBack}/>})
  }
  switch2 =()=> {
    this.setState({component:<CitySearch goBack={this.goBack}/>})
  }
  goBack =()=> {
    this.setState({component: this.state.welcomeComponent})
  }


  render() {
    return (
      <div className="App">
       {this.state.component}
      </div>
    );
  }
}

export default App;
