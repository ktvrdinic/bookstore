import React from 'react';
import toJSON from 'enzyme-to-json';
import App from '../App';
import { createShallow } from '@material-ui/core/test-utils';

describe('Test App Entry point', () => {
    let shallow;
    beforeAll(() => {
        shallow = createShallow();
    });

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<App />);
    });
    it('Should have a search tag with Search field!', ()=>{
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
})
