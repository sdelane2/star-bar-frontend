import React from 'react'
import '../styles/Login.css'

class Login extends React.Component{
    
    state = {
        username: "",
        password: ""
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }




    handleSubmit = e => {
        e.preventDefault()
        this.props.loginHandler(this.state)
        
    }

    render(){
        // console.log(this.state)
        return(
        
            <div class='box'>
                <h2>star bar</h2>
                <form onSubmit={this.handleSubmit}>
                    <div class="inputBox">
                        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} name="username"/>
                    </div>
                    <div class="inputBox">
                        <input type="text" placeholder="password" value={this.state.password} onChange={this.handleChange} name="password"/>
                    </div>
                    <input type="submit" name="sign-in" value="Sign In"></input><br></br>
                </form>
            </div>
    

        )
    }
}

export default Login