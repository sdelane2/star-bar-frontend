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
            <main id="login">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} name="username"/>
                    <input type="text" placeholder="password" value={this.state.password} onChange={this.handleChange} name="password"/>
                    <button
                    style={{
                        width: '100%',
                        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                      }}>
                    Log In
                    </button>
                </form>
            </main>

        )
    }
}

export default Login