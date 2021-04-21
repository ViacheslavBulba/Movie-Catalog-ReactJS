import React from 'react';
import renderer from 'react-test-renderer';
import PageNotFound from './PageNotFound';
import { MemoryRouter } from 'react-router';

test('snapshot test for page not found', () => {
    const component = renderer.create(
        <MemoryRouter>
            <PageNotFound />
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
