import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'
import {getProfile}from './UserFunctions'
import {Eliminar} from './UserFunctions'
import { Link} from 'react-router-dom'

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

    edit(id){
       this.props.history.push(`/register/${id}`)
    }

    deleteUser(id){
        Eliminar(id).then(res => {
            console.log(res);
            this.componentDidMount();
        })
    }
    render() {
        return (
            <div class="m-portlet m-portlet--mobile mt-5">
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            Lista de Clientes
                        </h3>
                    </div>
                </div>
                <div class="m-portlet__head-tools">
                    <ul class="m-portlet__nav">
                        <li class="m-portlet__nav-item">
                            <Link to="/register" class="btn btn-accent m-btn m-btn--custom m-btn--pill m-btn--icon m-btn--air">
                                    <span>
                                        <i class="la la-plus"></i>
                                        <span>Agregar Cliente</span>
                                    </span>
                            </Link>
                            
                        </li>    

                    </ul>
                </div>
            </div>
            <div class="m-portlet__body">
                <div id="m_table_1_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-striped- table-bordered table-hover table-checkable
                                dataTable no-footer dtr-inline" id="m_table_1" role="grid"
                                aria-describedby="m_table_1_info">
                                <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Accion</th>
                                    
                                </tr>
                                </thead>
                                <tbody>
                                        {this.state.users.map(user => (
                                            <tr key={user._id}>
                                                <td> {user.first_name}</td>
                                                <td>  {user.last_name} </td>
                                                <td> {user.email} </td>
                                                <td>
                                                    <div class="row" style={{marginleft: '0px', marginright: '0px'}}>
                                                        <div class="col-sm-6" style={{paddingleft: '5px', paddingright: '5px', height: '40px'}}>
                                                            <a  class="btn btn-outline-primary
                                                                m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
                                                            title="View" onClick={() => this.edit(user._id)} >
                                                                <i class="flaticon-edit"></i> 
                                                            </a>
                                                        </div>
                                                        <div class="col-sm-6" style={{paddingleft: '5px', paddingright: '5px', height: '40px'}}>
                                                                <button type="submit" class="btn btn-outline-danger
                                                                m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
                                                            onClick={() => this.deleteUser(user._id)} >
                                                                    <i class="flaticon-delete"></i> 
                                                                </button>
                                                        </div>
                                                    </div>
                                                </td>
                                       </tr>
                                        ))
                                        }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
            
        )

    }
}

export default Profile