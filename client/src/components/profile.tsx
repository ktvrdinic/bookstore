import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default function Profile() {
    const [books, setBooks] = useState<any>({});
    const [error, setError] = useState<any>({});
    useEffect(() => {
        axios.get('http://localhost:4000/profile')
            .then(data => {
                console.log(data);
                setBooks({ data });
            })
            .catch(error => {
                console.log(error);
                setError({ error });
            }
            );
    }, []);

    return (
        <>
            <Typography variant="h2" align="center">
                Dashboard
            </Typography>
            <div className="profileContainer">
                <div className="leftSection">
                    <Typography variant="h5">
                        List of books
                    </Typography>
                    {JSON.stringify(books)}
                    {JSON.stringify(error)}
                    <ul className="profileList">
                        <li>Test <div><Button color="primary">Update</Button><Button color="secondary">Remove</Button></div></li>
                        <li>Vladsa <div><Button color="primary">Update</Button><Button color="secondary">Remove</Button></div></li>
                        <li>Test <div><Button color="primary">Update</Button><Button color="secondary">Remove</Button></div></li>
                    </ul>
                    <Button variant="contained" color="primary">
                        Add Book
                    </Button>
                </div>
                <div className="rightSection">
                    <Typography variant="h5">
                        Information
                    </Typography>

                    <Typography variant="body2" style={{ color: 'gray' }}>
                        Karlo Tvrdinic
                    </Typography>

                    <Typography variant="body2" style={{ color: 'gray' }}>
                        karlo@gmail.com
                    </Typography>
                    <Button color="secondary">Sign Out</Button>
                </div>
            </div>
        </>
    )
}
