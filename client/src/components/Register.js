import React, { Component } from 'react'
import { register, oneUser, Editar } from './UserFunctions'
import { Link } from 'react-router-dom'


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
                this.props.history.push(`/profile`)
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
            <div class="m-content mt-5">
                <div class="m-portlet m-portlet--mobile">
                    <div class="m-portlet__head">
                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                                <h3 class="m-portlet__head-text">
                                    Datos del Cliente
                                </h3>
                            </div>
                        </div>
                        <div class="m-portlet__head-tools">
                            <ul class="m-portlet__nav">
                                <li class="m-portlet__nav-item">
                                    <Link to="/profile" class="btn m-btn--pill m-btn--air   btn-outline-success btn-sm m-btn m-btn--custom"
                                        style={{paddingbottom: "11px", paddingtop: "11px"}}> 
                                        <span>
                                            <i class="flaticon-reply"></i>
                                            <span>Regresar</span>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="m-portlet__body">
                <div id="m_table_1_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="container-fluid">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Registrar</h1>
                            <div className=" form-row">
                                                                  
                                    <div className="col-md-6 mb-3">
                                        <label for="validationDefault01" htmlFor="name"><strong>Nombre</strong></label>
                                        <input  type="text" className="form-control" id="validationDefault01" name="first_name" placeholder="Ingrese Nombre" 
                                        value={this.state.first_name} onChange={this.onChange} required></input>
                                    </div>
                                
                                
                                    <div className="col-md-6 mb-3">
                                        <label for="validationDefault01" htmlFor="name"><strong>Apellido</strong></label>
                                        <input  type="text" className="form-control" id="validationDefault01" name="last_name" placeholder="Ingrese Apellido"
                                            value={this.state.last_name} onChange={this.onChange} required></input>
                                    </div>
                                
                            </div>    
                            <div className=" form-row">
                                
                                    <div className="col-md-6 mb-3">
                                        <label for="validationDefault01" htmlFor="email"><strong>Email</strong></label>
                                        <input type="text" className="form-control" id="validationDefault01" name="email" placeholder="Ingrese Email"
                                            value={this.state.email} onChange={this.onChange} required></input>
                                    </div>
                                
                                
                                    <div className="col-md-6 mb-3">
                                        <label for="validationDefault01" htmlFor="password"><strong>Contraseña</strong></label>
                                        <input type="password" className="form-control" id="validationDefault01" name="password" placeholder="Ingrese Contraseña"
                                            value={this.state.password} onChange={this.onChange} required></input>
                                    </div>
                                
                            </div>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                                > Enviar </button>
                        </form> 
                    </div>
                  </div>
              </div>
            </div>
          </div>
         )
    }
}

export default Register