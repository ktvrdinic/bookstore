import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [state, setState] = useState({ name: "", surname: "", email: "", password: "", cpassword: "" });
    const [error, setError] = useState({ name: '', surname: '', email: '', password: '' });
    var history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
            history.push('/profile');
        }
    }, []);

    function onChange(event: any): void {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    function handleRegister(event: any): void {
        axios.post('http://localhost:4000/api/signup', { name: state.name, surname: state.surname, email: state.email, password: state.password, cpassword: state.cpassword })
        .then((response) => {
            if(response.data.error) setError(response.data.error)
            else if(response.data.success) {
                history.push('/login');
            }
        })
        .catch((error) => {
            console.log('Error', error);
        });
    }

    return (
        <div className="App">
            <div className="App">
                <div className="textWelcome">
                    <Typography variant="h2">
                        Registration
                    </Typography>
                    <Typography variant="body2" className='typographySecondary'>
                        You must to sign up to use our app
                    </Typography>
                </div>
            </div>
            <div className='holderSignUpTextField'>
                <TextField id="outlined-basic" label="Name" variant="outlined" name="name" onChange={onChange} value={state.name} error={error.name.length > 0} helperText={error.name.length > 0 && error.name} />
                <TextField id="outlined-basic" label="Surname" variant="outlined" name="surname" onChange={onChange} value={state.surname} error={error.surname.length > 0} helperText={error.surname.length > 0 && error.surname} />
                <TextField id="outlined-basic" label="E-mail" variant="outlined" name="email" onChange={onChange} value={state.email} error={error.email.length > 0} helperText={error.email.length > 0 && error.email} />
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' name="password" onChange={onChange} error={error.password.length > 0} value={state.password} />
                <TextField id="outlined-basic" label="Confirm password" variant="outlined" type='password' name="cpassword" onChange={onChange} error={error.password.length > 0} value={state.cpassword} helperText={error.password.length > 0 && error.password} />
                <Button variant="contained" color="primary" onClick={handleRegister}>
                    Register
                </Button>
                <Button color="primary" component={Link} to="/login">I already have account</Button>
            </div>

        </div>
    )
}
