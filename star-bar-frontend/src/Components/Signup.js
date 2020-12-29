import React from 'react'

class Signup extends React.Component{
    
    state = {
        name:"",
        birthdate: "",
        username: "",
        password: ""
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }




    handleSubmit = e => {
        e.preventDefault()
        this.props.signupHandler(this.state)
        
    }

    render(){
        console.log(this.state)
        return(
            <form onSubmit={this.handleSubmit}>
                 <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} name="username"/>
                 <input type="text" placeholder="password" value={this.state.password} onChange={this.handleChange} name="password"/>
                <input type="text" placeholder="name" value={this.state.name} onChange={this.handleChange} name="name"/>
                <input type="text" placeholder="birthdate" value={this.state.birthdate} onChange={this.handleChange} name="birthdate"/>
                <button>Sign Up</button>
            </form>

        )
    }
}

export default Signup