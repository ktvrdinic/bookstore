import React from 'react';
import Profile from '../components/profile'
import ListBooks from '../components/globals/listBooks';
import Dialogs from '../components/globals/dialogs';
import { createShallow } from '@material-ui/core/test-utils';

describe('Test Profile component', () => {
    let shallow, wrapper;

    beforeAll(() => {
        shallow = createShallow();
    });

    beforeEach(() => {
        wrapper = shallow(<Profile />);
    });

    it('Only one list book', () => {
        let listBook = wrapper.find(ListBooks);
        expect(listBook).toHaveLength(1);
    })

    it('Exist dialogs for add and update book', () => {
        let dialog = wrapper.find(Dialogs);
        expect(dialog).toHaveLength(2);
    })
});