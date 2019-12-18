
import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:5000/users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log('Registered')
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getProfile = user => {
    return axios
        .get('users/profile', {
            //headers: { Authorization: ` ${this.getToken()}` }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}
export const Eliminar= (user)=>{
    return axios
    .delete('users/delete/'+ user)
    .then(response =>{
        console.log(response)
    })
        .catch(err => {
            console.log(err)
        })
        
}

export const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem("usertoken");
  };
/*
export const logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("usertoken");
  };*/

export const oneUser = async (user) => {
    try {
        const res = await axios.get(`http://localhost:5000/users/oneUser/${user}`);
            return res.data;
    }
    catch (err) {
        alert(err);
    }
}

export const Editar = (user) => {
    return axios
    .put(`http://localhost:5000/users/actualizar/${user.id}`,{
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password
    }).then( res => {
        return res.data
    }).catch( err => {
        alert(err)
    });
}