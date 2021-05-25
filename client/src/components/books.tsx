import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Books() {
    const [searchField, setSearchField] = useState<string>('');
    const [books, setBooks] = useState<any>();
    const [error, setError] = useState<any>({});

    const handeClickSearch = (): void => {
        // Search
        console.log(searchField);
    };

    const handleChange = (e: any): void => {
        setSearchField(e.currentTarget.value);
    };

    useEffect(() => {
        axios.get('http://localhost:4000/books', { withCredentials: true })
            .then(body => {
                setBooks(body.data.books);
            })
            .catch(error => {
                console.log(error);
                setError({ error });
            }
            );
    }, []);

    return (
        <div className='App'>
            <div className="textWelcome">
                <Typography variant="h2">
                    List of books
                </Typography>
                <Typography variant="body2" className='typographySecondary'>
                    Here you can see list of books. If you are owner you can delete it.
                </Typography>
                <TextField
                    label='Search...'
                    className="btnSearch"
                    onChange={(e) => { handleChange(e) }}
                    variant='outlined'
                    InputProps={{
                        endAdornment: <SearchIcon style={{ cursor: 'pointer' }} onClick={() => { handeClickSearch() }} />
                    }}
                />
                <ul className="listBooks">
                    {books?.map((book: any) =>
                        <li><img style={{ maxHeight: '30px' }} src={book.coverImg} /> <span>{book.title}</span></li>
                    )}
                </ul>
            </div>
            <Button className='bookLoginBtn' color="primary" component={Link} to="/login">Log In</Button>
        </div>
    )
}
