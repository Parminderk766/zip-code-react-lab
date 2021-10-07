import React, { Component } from 'react';

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
        <div id="ZipInput">
        <label>
            Zip Code :   
            <input type="text" onChange={props.handler} />
        </label>
        </div>
    )
}
  
class ZipCode extends Component{
    constructor(props){
        super(props);
        this.state ={
          zipValue:"",
          data:[]
        }
    }
    
    handler=(event)=>{

        this.setState({
            zipValue: event.target.value,
            data:['error']
        });

        console.log(this.state.zipValue);

        fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
            .then(res=>res.json())
            .then(body => {
                console.log(body);
                this.setState({
                    data:body
                })
            }).catch(error=>{
                this.setState({
                    data:["error"]
                })
            })


    }
    
    display =()=>{
        if(this.state.data[0] !== "error")
            return  this.state.data.map(ele=>{
                        return <City zip={this.state.zipValue} idx={ele}/>
                    })
        else{
            return <h1>Enter valid zip code.</h1>
        }
    }
    
    render() {
        return (
            <div className="App">
            <div className="App-header">
            <button onClick={this.props.goBack}>Back</button>
                <h2>Zip Code Search</h2>
            </div>
            <ZipSearchField zip={this.state.zipValue} handler={this.handler}/>
            <div id="ZipContainer">
                {this.display()}
            </div>
            </div>
        );
    }
}
export default ZipCode;