import { Component } from "react";


function CitySearchField(props) {
    return (
        <div id="ZipInput">
        <label>
            City Name: <input type="text" onChange={props.handler} />
        </label>
        </div>
    )
}

class CitySearch extends Component{
    constructor(props){
        super(props);
        this.state={
            cityName: "",
            zipCodes:["error"],
        }
    }

    handler=(event)=>{
        this.setState({cityName:event.target.value})

        fetch(`http://ctp-zip-api.herokuapp.com/city/${event.target.value.toUpperCase()}`)
        .then(res=>res.json())
        .then(body1=>{
            this.setState({zipCodes:body1})
        }).catch(error=>{
            this.setState({
                zipCodes:["error"]
            })
        })

        console.log(this.state.states)

    }

    display=()=>{
        console.log(this.state.zipCodes)
        if(this.state.zipCodes[0] !== "error")
            return (
                <div>
                    <h4>Zip-Codes</h4>
                    <ul>
                        {this.state.zipCodes.map(zip=><li>{zip}</li>)}
                    </ul>
                </div>
            )
        else{
            return <h1>Enter valid city name.</h1>
        }
    }
    render(){
        return (
            <div className="App">
                <div className="App-header">
                    <button onClick={this.props.goBack}>Back</button>
                    <h2>City Search</h2>
                </div>
                <CitySearchField handler={this.handler}/>
                {this.display()}
            </div>
        )
    }
}
export default CitySearch;