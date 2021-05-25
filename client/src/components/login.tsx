import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

interface myProps {
    toggleAuth: () => void;
 }

export default function Login(props: myProps) {
    const [state, setState] = useState({ email: "", password: "" });
    const [error, setError] = useState({ restAPI: false });
    var history = useHistory();

    function onChange(event: any): void {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    function handleLogin(event: any): void {
        axios.post('http://localhost:4000/api/signin', { email: state.email, password: state.password })
            .then((response) => {
                if (response.data.error) {
                    setError({ restAPI: true });
                }
                else if(response.data.success) {
                    props.toggleAuth();
                    console.log(Cookies.get('token'));
                    history.push('/profile');
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
            {console.log('Cookie', Cookies.get('token'))}
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
