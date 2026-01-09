# Installation guide

## 1. Git initialization

As earlier to start to commit changes as easier will be to follow and check changes. So, create project on github: **project-name**

Then clone project from github:

```
git clone <github-project-url>
```


## 2. Setup new `Vite` - project
```
npm create vite <project-name>
  ? Select a framework: > React
  ? Select a variant: > TypeScript
cd <project-directory>
npm install
```


## 3. Create a `.nvmrc` file

Good to know the project version of Node

```
node --version > .nvmrc
```

This will create a file named .nvmrc with this content:

```
v23.5.0
```

Having done that, any developer can just run `nvm use` in the project folder and nvm will automatically switch to the correct version of node.



## 4. Install testing libraries to project

```
npm install -D vitest
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

  1. `@testing-library/react` -> for component testing
  2. `@testing-library/jest-dom` -> for DOM assertions
  3. `jsdom` -> for simulating a browser environment in Node for testing purposes


Update a `vite.config.ts` file with next configuration:
  ```js
    import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
    import { defineConfig as defineVitestConfig } from 'vitest/config';
    import react from '@vitejs/plugin-react';

    const viteConfig = defineViteConfig({
      plugins: [ react() ],
    });

    const vitestConfig = defineVitestConfig({
      test: {
        globals: true,
        environment: 'jsdom'
      },
    });

    export default mergeConfig(viteConfig, vitestConfig);

  ```

Reason to modify `vite.config.ts`: Vite config interface does not 
  know anything about Vitest and TS does not allow excessive properties 
  (properties not defined by the type/interface). So Vitest must extend 
  Vite config (defined as TS interface). React has conflict in configuration 
  file if switch `config` import from `vite` to `vitest` and for this 
  reason better to use renamed imports.

Additional info about Vitest: https://vitest.dev/config/file.html



## 5. Check that project have a tsconfig.json..

.. (or **jsconfig.json**) to be sure that LSP - Language Service Protocol 
  (as VSCode, Sublime Text, etc.) - with allow LSP to recognize all 
  project files. 
  For more details read [doc](https://code.visualstudio.com/docs/languages/jsconfig#_why-do-i-need-a-jsconfigjson-file).



## 6. [Optional] Relative Paths imports to project

Edit `vite.config.js`:

```js
  resolve: {
    alias: {
      'src': '/src',
      'assets': '/src/assets',
      'components': '/src/components',
      'constants': '/src/constants',
      'hooks': '/src/hooks',
      'layouts': '/src/layouts',
      'pages': '/src/pages',
      'services': '/src/services',
      'types': '/src/types',
    },
  },
```

Edit `tsconfig.app.json` and `tsconfig.node.json`:

```js
    'paths': {
      'src/*': ['./src/*'],
      'assets': ['./src/assets/*'],
      'constants': ['./src/constants/*'],
      'types': ['./src/types'],
      'components': '/src/components',
      'hooks': '/src/hooks',
      'layouts': '/src/layouts',
      'pages': '/src/pages',
      'services': '/src/services',
    },
```

Paths can be different and depends from projects.



## 7. [Optional`] `Eslint`

`ESLint` is an open source project that helps find and fix problems with JavaScript code.

### Install `eslint`

```
npm install --save-dev eslint @eslint/js @stylistic/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort
```
  1. `eslint`: pattern checker for JavaScript.
  2. `@eslint/js`: enables the rules recommended by the ESLint team.
  3. `@stylistic/eslint-plugin`: stylistic rules for ESLint, works for both JavaScript and TypeScript.
  4. `eslint-plugin-react-hooks`: enforces rules for React Hooks.
  5. `eslint-plugin-react-refresh`: validate that your components can safely be updated with Fast Refresh.
  6. `eslint-plugin-simple-import-sort`: ensures proper import/export syntax.

### Create a `eslint.config.js`

Create a `eslint.config.js` file in the root of project and add config.

Example of  **`eslint-plugin-simple-import-sort` sort rules** in `eslint.config.js`:

```
import simpleImportSort from 'eslint-plugin-simple-import-sort';

{
  ...
  "plugins": {
    ...
    'simple-import-sort': simpleImportSort,
  },
  "rules": {
    ...
    'simple-import-sort/imports': [
      'error',
      {
        'groups': [
          // First `react` first, `next` second, then packages starting with a character
          ['^react$', '^react-dom$'],
          // Packages starting with `@mui/*`
          ['^@mui/material', '@mui/x-data-grid', '^@mui/system', '^@mui/icons-material' ],
          // Packages starting with a character, with `@` and with `~`
          ['^[a-z]', '^@', '^~'],
          // Packages starting with `~`
          // ['^~'],
          // Imports starting with `src`
          ['src$', ],
          // Imports starting with `../`
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Imports starting with `./`
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css$'],
          // Side effect imports
          ['^\\u0000']
        ]  
      }
    ],
    'simple-import-sort/exports': 'error',
  }
}
```

### Update `package.json`

Add command to `package.json` scripts:
```
"scripts": {
  ...
  "lint": "eslint .",
},
```


## 8. [Optional] `Prettier`

### Install `Prettier`
```
npm install --save-dev prettier eslint-config-prettier
```

  1. `prettier`: code formatter.  It enforces a consistent style by parsing 
    project code and re-printing it with its own rules that take the maximum 
    line length into account, wrapping code when necessary.
  2. `eslint-config-prettier`: Disables ESLint rules that might conflict with Prettier.
  3. `eslint-plugin-react`: Adds linting rules for React.

### Create a `.prettierrc` and `.prettierignore`

Create a `.prettierrc` file in the root of project and add required rules.

Create a `.prettierignore` file in the root of project and add required rules.

### Update `package.json`

Add command to `package.json` scripts:

```
"scripts": {
  ...
  "format": "prettier --write .",
},
```

**Own Note:** I do not like how Prettier format arrays and objects without free space in the 
beginning/end -> so for now I disabled it.



## 9. [Optional] `Husky`

`Husky` is tool which automatically lint commit messages, code, and run tests upon committing or pushing.

### Install `husky` and `lint-staged`

```
npm install -D husky lint-staged
npx husky init
```

### Update  `.husky/pre-commit` file

```
npx lint-staged
```

### Update `package.json` file

Examples:
```
  "lint-staged": {
    "*.+(js|jsx|json|css|scss|ts|tsx)": [
      "prettier --cache --write"
    ],
    "*.{js,jsx,ts,tsx}": "eslint --fix"
  }
```
or
```
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

Lint stages [docs](https://github.com/lint-staged/lint-staged)



## 10. [Optional] `@loadable/component`

`@loadable/component` is a library for dynamically loading components in a React application. It helps reduce the initial bundle size by loading components only when they are needed. This is especially useful for improving the performance of large applications.

### Install `@loadable/component`
```
npm install @loadable/component
```

### Update `vite-env.d.ts`

Extend Vite's module resolution to include '@loadable/component'

```
declare module '@loadable/component';
```

### Using `@loadable/component`

```
import React from 'react';
import loadable from '@loadable/component';

const MyComponent = loadable(() => import('./MyComponent'));

const App = () => (
  <div>
    <h1>Hello, World!</h1>
    <MyComponent />
  </div>
);

export default App;
```

In the example above, the `MyComponent` component will only be loaded when needed, rather than when the application first loads.

### Handling Loading State

When dynamically loading components, there may be a delay. To provide feedback to the user that the component is loading, we can add a loading component.

```
import React from 'react';
import loadable from '@loadable/component';

const Loading = () => <div>Loading...</div>;

const MyComponent = loadable(() => import('./MyComponent'), {
  fallback: <Loading />,
});

const App = () => (
  <div>
    <h1>Hello, World!</h1>
    <MyComponent />
  </div>
);

export default App;
```

### Using `@loadable/server` for SSR

`@loadable/component` also provides the `@loadable/server` module to handle component loading on the server side.

First, install the `@loadable/server` module:

```
npm install @loadable/server
```

Example of how to use it in an SSR application:

```
// server.js
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { ChunkExtractor } from '@loadable/server';
import App from './src/App';

const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/*', (req, res) => {
  const statsFile = path.resolve('./build/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });

  const jsx = extractor.collectChunks(<App />);
  const html = ReactDOMServer.renderToString(jsx);

  const template = fs.readFileSync(path.resolve('./build/index.html'), 'utf8');
  const finalHtml = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  res.send(finalHtml);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

### Optimization with `@loadable/babel-plugin`

This plugin will automatically add IDs to dynamically loaded components so that `@loadable/server` can work more efficiently.

Install the Babel plugin:

```
npm install @loadable/babel-plugin
```

Add plugin to Babel configuration:

```
{
  "plugins": ["@loadable/babel-plugin"]
}
```

## 11. [Optional] `Emotion`

[Emotion](https://emotion.sh/docs/introduction) is a library designed for writing css styles with JavaScript. It provides powerful and predictable style composition in addition to a great developer experience with features such as source maps, labels, and testing utilities. Both string and object styles are supported.

### Install `emotion`

```
npm install @emotion/react @emotion/styled
```

### Using `emotion`

```
import styled from '@emotion/styled'

let SomeComp = styled.div({
  color: 'hotpink'
})

let AnotherComp = styled.div`
  color: ${props => props.color};
`

render(
  <SomeComp>
    <AnotherComp color="green" />
  </SomeComp>
)

```

