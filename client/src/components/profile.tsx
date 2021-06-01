import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ListBooks from './globals/listBooks';
import Dialogs from './globals/dialogs';

interface myProps {
    onClickLogout: (e: any) => void,
}

export interface IUpdateState {
    title: String,
    description: String,
    coverImg: String,
    price: String,
    _id: String
}

export default function Profile(props: myProps) {
    const [state, setState] = useState({ title: "", description: "", coverImg: "", price: "" });
    const [stateUpdate, setStateUpdate] = useState<IUpdateState>({ title: "", description: "", coverImg: "", price: "", _id: "" });
    const [books, setBooks] = useState<any>();
    const [error, setError] = useState<any>({});
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);

    const [updateSend, setUpdateSend] = useState({});

    const user = localStorage.getItem('user');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenUpdate = (title: String, description: String, coverImg: String, price: String, _id: String) => {
        setStateUpdate({ title, description, coverImg, price, _id });
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

    function onChange(event: any): void {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    function onChangeUpdate(event: any): void {
        const { name, value } = event.target;
        let object = Object.assign(updateSend, { [name]: value });
        setUpdateSend({ ...updateSend, ...object });
        setStateUpdate(prevState => ({ ...prevState, [name]: value }));
    }

    const deleteBook = (id: String): void => {
        axios.post('http://localhost:4000/booksapi/delete', { _id: id },  { headers: { Authorization: `${localStorage.getItem('token')}` }})
            .then(body => {
                getBook();
            })
            .catch(err => {
                console.log(err);
                props.onClickLogout(null);
            })
    }

    const addBook = (): void => {
        axios.post('http://localhost:4000/booksapi/insert', { state },  { headers: { Authorization: `${localStorage.getItem('token')}` }})
            .then(body => {
                getBook();
            })
            .catch(err => {
                console.log(err);
                props.onClickLogout(null);
            })
    }

    const updateBook = (): void => {
        axios.put('http://localhost:4000/booksapi/update', { _id: stateUpdate._id, ...updateSend },  { headers: { Authorization: `${localStorage.getItem('token')}`, withCredentials: true }})
            .then(body => {
                getBook();
            })
            .catch(err => {
                console.log(err);
                props.onClickLogout(null);
            })
    }

    const getBook = (): void => {
        axios.get('http://localhost:4000/profile', { headers: { Authorization: `${localStorage.getItem('token')}` }, withCredentials: true })
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
                    <div className="profileList">
                        <ListBooks
                            books={books}
                            haveActions={true}
                            handleClickOpenUpdate={handleClickOpenUpdate}
                            deleteBook={deleteBook}
                        />
                    </div>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Add Book
                    </Button>
                    <Dialogs 
                        open={open} 
                        onClose={handleClose}
                        onChange={onChange}
                        title={state.title}
                        description={state.description}
                        coverImg={state.coverImg}
                        price={state.price}
                        handleClose={handleClose}
                        addBook={addBook}
                    />
                    <Dialogs 
                        open={openUpdate} 
                        onClose={handleCloseUpdate}
                        onChange={onChangeUpdate}
                        title={stateUpdate.title}
                        description={stateUpdate.description}
                        coverImg={stateUpdate.coverImg}
                        price={stateUpdate.price}
                        handleClose={handleCloseUpdate}
                        updateBook={updateBook}
                    />
                </div>
                <div className="rightSection">
                    <Typography variant="h5">
                        Information
                    </Typography>
                    <Typography variant="body2" style={{ color: 'gray' }}>
                        {user}
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={props.onClickLogout}>Sign Out</Button>
                </div>
            </div>
        </>
    )
}
