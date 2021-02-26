# Components home task part 1 (functional components)

## Comments

1. First of all - I implemented this home task via functional components (not
   class components). After watching a video for this home task, for some
   reasons, I had a feeling that it is better/preferable to implement this home
   task via the functional components and not via the class components. And that
   after all the final project implementation should be with functional
   components. If this is a mistake and I misunderstood - I can re-implement
   this home task with class components.

2. According to
   https://stackoverflow.com/questions/48482619/how-can-i-make-use-of-error-boundaries-in-functional-react-components
   there is no easy way to turn a functional component into an error boundary.
   So I added an error boundary component, but it is not really of use with
   functional components.

3. Sorting dropdown - not implemented (tried to use bootstrap dropdown classed,
   but when I add import of bootstrap into one of components - it brakes/changes
   layout and styles a bit, so for now I excluded that dropdown)

4. Filtering component - is also more like a mockup for now

## Some command used for this task

`npm i svg-url-loader --save-dev`

`npm install --save moment react-moment`

`npm install bootstrap`

`npm install url-loader --save-dev`

`npm install --save prop-types`

## Some useful Links

https://reactjs.org/docs/typechecking-with-proptypes.html

https://reactjs.org/docs/error-boundaries.html

# Webpack home task

## Task

Create package.json file and install React, Redux, React-Redux, React-Router,
Jest. Install and configure Webpack & Babel to get build artifact by running npm
command.

## Resources used

https://webpack.js.org/guides/getting-started/

https://webpack.js.org/guides/production/

https://webpack.js.org/guides/development/

https://babeljs.io/setup#installation

## Steps performed

`npm init -y`

`npm install react react-dom @reduxjs/toolkit react-redux react-router`

`npm install --save-dev webpack webpack-cli webpack-dev-server`

`npm install --save-dev webpack-merge`

`npm install --save-dev mini-css-extract-plugin css-minimizer-webpack-plugin`

`npm install --save-dev css-loader`

`npm install --save-dev clean-webpack-plugin`

`npm install --save-dev html-webpack-plugin`

## Jest setup

`npm install --save-dev jest`

run `./node_modules/.bin/jest --init` to create config

## Babel setup

https://babeljs.io/docs/en/usage/

`npm install --save-dev babel-loader @babel/core @babel/preset-env`

`npm install --save-dev @babel/cli`

`npm install --save @babel/polyfill`

`npm install --save-dev @babel/preset-react`

## Results

`npm run build`

`npm start`

`npm run build-prod`

`npm run start-prod`

`npm test`
