import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface IProps {
    books?: any,
    searchField?: String,
    handleClickOpenUpdate?: (title: String, description: String, coverImg: String, price: String, _id: String) => void,
    deleteBook?: (id: String) => void,
    haveActions?: boolean
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 250,
        marginRight: '25px',
        marginBottom: '25px'
    },
});

const ListBooks: React.FC<IProps> = ({ books, searchField = '', handleClickOpenUpdate, deleteBook, haveActions = false }: IProps) => {
    const classes = useStyles();
    
    return (
        <>
            { books && books.filter((book: any) => book.title.toLowerCase().includes(searchField && searchField.toLowerCase())).map((book: any, index: any) => (
                <Card className={classes.root} key={index}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Book image"
                            height="140"
                            image={book.coverImg}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {book.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {book.description}
                            </Typography>
                            <br />
                        </CardContent>
                    </CardActionArea>
                    {haveActions && <CardActions>
                        <Button size="small" color="primary" onClick={(e) => { handleClickOpenUpdate && handleClickOpenUpdate(book.title, book.description, book.coverImg, book.price, book._id) }}>
                            Update
                        </Button>
                        <Button size="small" color="secondary" onClick={(e) => { deleteBook && deleteBook(book._id) }}>
                            Delete
                        </Button>
                        <Typography style={{ fontWeight: 'bold', color: '#3f50b5', marginLeft: 'auto', marginRight: '15px' }} variant="body2" color="textSecondary" component="p">
                            $ {book.price}
                        </Typography>
                    </CardActions>}
                </Card>
            ))}
        </>
    )
};

export default ListBooks;