import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

// interface myProps {
//     isAuth: Boolean
// }

export default function Login(props: any) {
    const [state, setState] = useState({ email: "", password: "" });
    const [error, setError] = useState({ restAPI: false });
    var history = useHistory();

    useEffect(() => {
        if (props.isAuthenticated) {
            history.push('/profile');
        }
    }, []);

    function onChange(event: any): void {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    function handleLogin(event: any): void {
        axios.post('http://localhost:4000/api/signin', { email: state.email, password: state.password }, { withCredentials: true })
            .then(async (response) => {
                if (response.data.success.user) {
                    await localStorage.setItem('token', "Bearer " + response.data.success.token);
                    await localStorage.setItem('user', response.data.success.user.name);
                    props.setIsAuthenticated(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setError({ restAPI: true })
            });
    }

    return (
        <>
            <div className="App">
                <div className="textWelcome">
                    <Typography variant="h2">
                        Welcome to the bookstore
                    </Typography>
                    <Typography variant="body2" className='typographySecondary'>
                        To use our app, you must first register or log in.
                    </Typography>
                </div>
            </div>
            <p>{Cookies.get('token')}</p>
            <div className='holderTextField'>
                <TextField id="outlined-basic" label="E-mail" variant="outlined" name='email' onChange={onChange} error={error.restAPI}
                    InputProps={{
                        endAdornment: <PersonIcon />
                    }}
                />
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' name='password' onChange={onChange} error={error.restAPI} helperText={error.restAPI && "Incorrect email or password"}
                    InputProps={{
                        endAdornment: <LockIcon />
                    }} />
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Log In
                </Button>
                <Button color="primary" component={Link} to="/signup">I don't have account</Button>
            </div>
        </>
    )
}
