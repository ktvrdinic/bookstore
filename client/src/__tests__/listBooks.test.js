import React from 'react';
import ListBooks from '../components/globals/listBooks';
import { createShallow } from '@material-ui/core/test-utils';

describe('Test List book component', () => {
    let shallow, wrapper;

    beforeAll(() => {
        shallow = createShallow();
    });

    it('Should not render any cards', () => {
        wrapper = shallow(<ListBooks books={[]} />);
        expect(wrapper.find('#card')).toHaveLength(0);
    });

    it('Should render right number of cards', () => {
        let books = [{
            title: 'Test',
            description: 'This is interesting book',
            coverImg: '',
            price: 222,
            _id: 1
        },
        {
            title: 'Test2',
            description: 'This is interesting book2',
            coverImg: '',
            price: 333,
            _id: 2
        }];

        wrapper = shallow(<ListBooks books={books} />);
        expect(wrapper.find('#card')).toHaveLength(2);
    });

    it('Should pass and place text correctly', () => {
        let books = [{
            title: 'Test',
            description: 'This is interesting book',
            coverImg: '',
            price: 222,
            _id: 1
        }];

        wrapper = shallow(<ListBooks books={books} />);
        expect(wrapper.find('#title').text()).toEqual(books[0].title);
        expect(wrapper.find('#description').text()).toEqual(books[0].description);
        expect(wrapper.find('#cardMedia').text()).toEqual(books[0].coverImg);
    });
})
