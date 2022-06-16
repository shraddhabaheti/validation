import { Home } from "@mui/icons-material";
import { Component, useEffect } from "react";
import {WithRouter} from '../src/WithRouter'
class Homes extends Component {
    
    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.navigate('/loginc')
        }
    }
    
    render(){
       
      
        return(
            <div>
                <p className="label3">Welcome To Home page!</p>
         <button className="btn" onClick={()=>{
        localStorage.removeItem('token')
        this.props.navigate('/loginc')
            }}>Logout</button>
       

            </div>
        )
    }
}
export default WithRouter(Homes);