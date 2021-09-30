import React, { Component } from 'react';
import './App.css';


function City(props) {
  let data = props.idx;
  return (<div>
    <h5>{props.idx["City"]}, {props.idx["State"]}</h5>
    
    <ul>
      <li>State: {data["State"]}</li>
      <li>Location: ({data["Lat"]}, {data["Long"]})</li>
      <li>Population (estimated): {data["EstimatedPopulation"]}</li>
      <li>Total Wages: {data["TotalWages"]}</li>
    </ul>
  </div>);

}



function ZipSearchField(props) {
  
  return (
    <div id="input">
      <label>
          Zip Code :   
          <input type="text" onChange={props.handler} />
      </label>
    </div>
    )
}


class App extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      zipValue:"",
      data:[]
    }
  }

  handler=(event)=>{

    this.setState({
      zipValue: event.target.value
    });

    console.log(this.state.zipValue);

    fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
      .then(res=>res.json())
      .then(body => {
        console.log(body);
        this.setState({
          data:body
        })

      })


  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zip={this.state.zipValue} handler={this.handler}/>
        <div id="cityContainer">
          {this.state.data.map(ele=>{
            return <City zip={this.state.zipValue} idx={ele}/>
          })}
        </div>
      </div>
    );
  }
}

export default App;
