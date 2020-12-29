import React from 'react'

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
        console.log(this.state)
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} name="username"/>
                <input type="text" placeholder="password" value={this.state.password} onChange={this.handleChange} name="password"/>
                <button>Log In</button>
            </form>

        )
    }
}

export default Login