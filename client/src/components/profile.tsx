import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
interface myProps {
    onClickLogout: (e: any) => void,
}

export default function Profile(props: myProps) {
    const [state, setState] = useState({ title: "", description: "", coverImg: "", price: "" });
    const user = localStorage.getItem('user');
    const [books, setBooks] = useState<any>();
    const [error, setError] = useState<any>({});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteBook = (id: String): void => {
        axios.post('http://localhost:4000/booksapi/delete', { _id: id }, { withCredentials: true })
            .then(body => {
                getBook();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addBook = (): void => {
        axios.post('http://localhost:4000/booksapi/insert', { state }, { withCredentials: true })
            .then(body => {
                getBook();
            })
            .catch(err => {
                console.log(err)
            })
    }

    function onChange(event: any): void {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const getBook = (): void => {
        axios.get('http://localhost:4000/profile', { withCredentials: true })
            .then(body => {
                setBooks(body.data.books);
            })
            .catch(error => {
                console.log(error);
                setError({ error });
                props.onClickLogout(null);
            });
    }


    useEffect(() => {
        getBook();
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
                    <ul className="profileList">
                        {books?.map((book: any) =>
                            <li>
                                <img style={{ maxWidth: '40px' }} src={book.coverImg} /> {book.title} - {book.description}
                                <div>
                                    <Button color="primary" onClick={(e) => { console.log(`Update ${book._id}`) }}>Update</Button>
                                    <Button color="secondary" onClick={(e) => { deleteBook(book._id) }}>Remove</Button>
                                </div>
                            </li>
                        )}
                    </ul>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Add Book
                    </Button>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add book</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Here you must type all details about your book.
                            </DialogContentText>
                            <TextField
                                variant='outlined'
                                className='modalTextField'
                                autoFocus
                                margin="dense"
                                id="name"
                                onChange={onChange}
                                name='title'
                                label="Title"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                variant='outlined'
                                className='modalTextField'
                                id="standard-multiline-static"
                                label="Description"
                                name='description'
                                onChange={onChange}
                                fullWidth={true}
                                multiline
                                rows={4}
                            />
                            <TextField
                                variant='outlined'
                                className='modalTextField'
                                name='coverImg'
                                autoFocus
                                margin="dense"
                                onChange={onChange}
                                id="name"
                                label="IMG URI"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                variant='outlined'
                                className='modalTextField'
                                autoFocus
                                margin="dense"
                                name='price'
                                onChange={onChange}
                                id="name"
                                label="Price"
                                type="number"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => { handleClose(); addBook(); }} color="primary">
                                Add book
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="rightSection">
                    <Typography variant="h5">
                        Information
                    </Typography>

                    <Typography variant="body2" style={{ color: 'gray' }}>
                        {user}
                    </Typography>
                    <Button color="secondary" onClick={props.onClickLogout}>Sign Out</Button>
                </div>
            </div>
        </>
    )
}
