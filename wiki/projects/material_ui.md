# Project #1 - Testing `Material UI`

## Goal:

Build a dashboard page that shows a table/list of people. Users can add a person
(new entries appear at the beginning of the list), edit or delete existing people, 
and filter the list (search, attribute filters). The component should be accessible, 
test-covered, and integrate with the app's state or backend API.

## Stack:

- [React (v.19.*)](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Material UI](https://mui.com/)


## Instruction for some packages installation

**Note:** part of instructions about packages installation available in [fe -> project_setup](../fe/project_setup.md).


### 1. `Material-UI`

**Install `Material-UI` and `Material Icons`**

```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

**Fonts** ->  documentation says next: _`Material UI` uses the `Roboto font` by default. Add it to your project's `<head />` tag._

```
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>

```

**Icons:** -> documentation says next: _to use the font `Icon` component, you must first add the Material Icons font inside your project's  `<head />` tag._

```
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

More detail or another way for fonts and icons use, check [documentation](https://mui.com/material-ui/getting-started/installation/).



