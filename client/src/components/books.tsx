import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

export default function Books() {
    const [searchField, setSearchField] = useState<string>('');

    const handeClickSearch = (): void => {
        // Search
        console.log(searchField);
    };

    const handleChange = (e: any): void => {
        setSearchField(e.currentTarget.value);
    };

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
                    onChange={(e) => {handleChange(e)}}
                    variant='outlined'
                    InputProps={{
                        endAdornment: <SearchIcon style={{ cursor: 'pointer' }} onClick={() => {handeClickSearch()}}/>
                    }}
                />
                <ul className="listBooks">
                    <li>Test</li>
                    <li>Knjiga 1</li>
                    <li>Knjiuga 2</li>
                    <li>Test</li>
                    <li>Knjiga 1</li>
                    <li>Knjiuga 2</li>
                    <li>Test</li>
                    <li>Knjiga 1</li>
                    <li>Knjiuga 2</li>
                </ul>
            </div>
        </div>
    )
}
