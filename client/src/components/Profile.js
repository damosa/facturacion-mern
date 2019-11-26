import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'
import {getProfile}from './UserFunctions'
import {Eliminar} from './UserFunctions'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
           /* first_name: '',
            last_name: '',
            email: '',*/
            users: [],
            errors: {}
        }
    }

    componentDidMount() {
        /*const token = localStorage.usertoken
        const decoded = jwt_decode(token)*/
        getProfile().then(res => {
           console.log(res);
           this.setState({users: res})
        })
        this.setState({
           /* first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email*/
        })
    }
    deleteUser(id){
        Eliminar(id).then(res => {
            console.log(res);
            this.componentDidMount();
        })
    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">USUARIOS: </h1>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Email</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user => (
                                <tr>      
                                <td> {user.first_name}</td>
                                <td>  {user.last_name} </td>
                                <td> {user.email} </td>
                                <td><button className="btn btn-warning">Editar</button></td>
                                    <td><button onClick={() => this.deleteUser(user._id)}className="btn btn-danger">Eliminar</button></td>
                                 </tr>   
                            ))
                            }
                        </tbody>    
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile