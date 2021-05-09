import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import PageNotFound from './PageNotFound';

test('snapshot test for page not found', () => {
  const component = renderer.create(
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
