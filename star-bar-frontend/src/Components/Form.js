import React from 'react'

class Form extends React.Component{
    
    state = {
        name:"",
        birthday: ""
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        
    }

    render(){
        console.log(this.state)
        return(
            <form onSubmt={this.handleSubmit}>
                <input type="text" placeholder="name" value={this.state.name} onChange={this.handleChange} name="name"/>
                <input type="text" placeholder="birthday" value={this.state.birthday} onChange={this.handleChange} name="birthday"/>
                <button>Log In</button>
            </form>

        )
    }
}

export default Form