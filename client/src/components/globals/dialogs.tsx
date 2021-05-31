import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface IProps {
    open: boolean,
    onClose: () => void,
    onChange: (event: any) => void,
    title: String,
    description: String,
    coverImg: String,
    price: String,
    handleClose: () => void,
    updateBook?: () => void,
    addBook?: () => void
}

const Dialogs: React.FC<IProps> = ({open, onClose, onChange, title, description, coverImg, price, handleClose, updateBook, addBook}) => {

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update book</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here you must type all details about your book.
                </DialogContentText>
                <TextField
                    id="title"
                    variant='outlined'
                    className='modalTextField'
                    autoFocus
                    margin="dense"
                    onChange={onChange}
                    value={title}
                    name='title'
                    label="Title"
                    type="text"
                    fullWidth
                />
                <TextField
                    id="description"
                    variant='outlined'
                    className='modalTextField'
                    label="Description"
                    name='description'
                    value={description}
                    onChange={onChange}
                    fullWidth={true}
                    multiline
                    rows={4}
                />
                <TextField
                    id="coverImg"
                    variant='outlined'
                    className='modalTextField'
                    name='coverImg'
                    value={coverImg}
                    autoFocus
                    margin="dense"
                    onChange={onChange}
                    label="IMG URI"
                    type="text"
                    fullWidth
                />
                <TextField
                    id="price"
                    variant='outlined'
                    className='modalTextField'
                    autoFocus
                    margin="dense"
                    name='price'
                    value={price}
                    onChange={onChange}
                    label="Price"
                    type="number"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => { handleClose(); updateBook && updateBook(); addBook && addBook(); }} color="primary">
                    { updateBook ? 'Update' : 'Add book'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Dialogs;
