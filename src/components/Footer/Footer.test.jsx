import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';

test('snapshot test for footer', () => {
  const component = renderer.create(
    <Footer />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
