import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Books from '../components/books';

describe('Test App Entry point', () => {
    it('Should have a search tag with Search field!', ()=>{
        const wrapper = shallow(<App />);
        expect(wrapper.find(Books).to.have.lengthOf(1));
    });
})
