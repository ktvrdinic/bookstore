import React from 'react';
import Books from '../components/books';
import ListBooks from '../components/globals/listBooks';

import { createShallow } from '@material-ui/core/test-utils';
import { TextField } from '@material-ui/core';

const searchTerms = ['test', 'a', 'bla']

describe('Test Books component', () => { 
    let shallow, wrapper;
    beforeAll(() => {
        shallow = createShallow();
    });

    beforeEach(() => {
        wrapper = shallow(<Books />);
    });

    it('Have only one search textfield for searching book', () => {
        expect(wrapper.find(TextField)).toHaveLength(1);
        expect(wrapper.find('#searchField').props().label).toEqual('Search...');
    })

    it('Only one list book', () => {
        let listBook = wrapper.find(ListBooks);
        expect(listBook).toHaveLength(1);
    })
})
