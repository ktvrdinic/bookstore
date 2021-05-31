import React from 'react';
import Dialogs from '../components/globals/dialogs';
import { createShallow } from '@material-ui/core/test-utils';

describe('Test List book component', () => {
    let shallow, wrapper;

    beforeAll(() => {
        shallow = createShallow();
    });

    it('Should not render any cards', () => {
        let information = {
            title: 'Test',
            description: 'This is description test',
            coverImg: 'testString',
            price: '343'
        };

        wrapper = shallow(<Dialogs
            title={information.title}
            description={information.description} 
            coverImg={information.coverImg} 
            price={information.price} />);

        expect(wrapper.find('#title').props().value).toEqual(information.title);
        expect(wrapper.find('#description').props().value).toEqual(information.description);
        expect(wrapper.find('#coverImg').props().value).toEqual(information.coverImg);
        expect(wrapper.find('#price').props().value).toEqual(information.price);
    });
})
