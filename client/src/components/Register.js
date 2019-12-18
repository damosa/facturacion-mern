import React, { Component } from 'react'
import { register, oneUser, Editar } from './UserFunctions'


class Register extends Component {
    
    constructor() {
        super()
        this.state = {
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    getOneuser(){
        const { id } = this.props.match.params
        oneUser(id).then( res => {
            this.setState({
                id: id,
                first_name: res.first_name,
                last_name: res.last_name,
                email: res.email,
                password: res.password
            })
        }).catch( err => {

        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        const { id } = this.props.match.params
        if(id === undefined){
            e.preventDefault()
            const newUser = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            }
    
            register(newUser).then(res => {
                this.props.history.push(`/login`)
            })
        }else{
            Editar(this.state).then( res =>{
            
            }).catch( err => {
                alert(err);
            });
            this.props.history.push(`/profile`)
            
        }
        
        
    }
    
    componentDidMount(){
        this.getOneuser();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Registrar</h1>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter your first name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter your lastname name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Register!
              </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register