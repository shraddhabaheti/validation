import React,{Component} from "react";

class Login extends Component
{
    render()
    {
        return(
            <form>
               <h1 id="id">Shraddha<sub id="id1">Baheti</sub></h1>
             <p className="label3">Welcome Back !</p>
            <label className="label" >Name</label>
            <input type="text"  className="input" name="name" placeholder="Name"/>
            <label className="label2">Password</label>
              <input type="text"  className="input" name="password" placeholder="password" />
              <button className="btn" type="submit">Sign In</button>

            </form>
        )

    }
}
export default Login;