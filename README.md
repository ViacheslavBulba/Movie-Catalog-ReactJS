# _Movie Catalog React Project_

# Project Features

- React Function components
- Webpack
- Redux, React-Redux, Redux-Thunk
- React-Router
- Formik Forms
- Testing with Jest
- Pagination of search results
- 404 Page Not Found page for nonexistent routes
- Prop Types
- ESLint

### Below are resources used for implementation and steps performed

#### How to add a backend (local movies API service/server) as a dependency

`npm i --save-dev git+https://github.com/VarvaraZadnepriak/MoviesAPI.ReactJS.git`

`cd ~/git/react-mentoring-program/node_modules/movie-api-server`

`npm start`

#### React Hooks

https://www.robinwieruch.de/react-usecallback-hook
https://www.robinwieruch.de/react-usememo-hook
https://www.robinwieruch.de/react-memo

#### "Add movie" modal popup

`npm install react-bootstrap bootstrap`

`https://react-bootstrap.github.io/components/modal/`

##### Additional libraries

`npm i svg-url-loader --save-dev`

`npm install --save moment react-moment`

`npm install bootstrap`

`npm install url-loader --save-dev`

`npm install --save prop-types`

#### ESLint setup

`npm install eslint --save-dev`

`npx eslint --init`

#### Webpack setup

https://webpack.js.org/guides/getting-started/
https://webpack.js.org/guides/production/
https://webpack.js.org/guides/development/
https://babeljs.io/setup#installation

`npm init -y`

`npm install react react-dom @reduxjs/toolkit react-redux react-router`

`npm install --save-dev webpack webpack-cli webpack-dev-server`

`npm install --save-dev webpack-merge`

`npm install --save-dev mini-css-extract-plugin css-minimizer-webpack-plugin`

`npm install --save-dev css-loader`

`npm install --save-dev clean-webpack-plugin`

`npm install --save-dev html-webpack-plugin`

##### Babel setup

https://babeljs.io/docs/en/usage/

`npm install --save-dev babel-loader @babel/core @babel/preset-env`

`npm install --save-dev @babel/cli`

`npm install --save @babel/polyfill`

`npm install --save-dev @babel/preset-react`

#### Jest setup

`npm install --save-dev jest`

run `./node_modules/.bin/jest --init` to create config

`./node_modules/.bin/jest --updateSnapshot`

`npm test -- -u`

`./node_modules/.bin/jest --collect-coverage`

`npm install --save-dev @testing-library/react`

`npm install --save-dev @testing-library/user-event`

##### Commands to build and run project

`npm run build`

`npm start`

`npm run build-prod`

`npm run start-prod`

`npm test`

`npx eslint src --ext .jsx`

`npx eslint src --ext .js`
