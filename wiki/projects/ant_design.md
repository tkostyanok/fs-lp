## And Design

## Goal:

Build a beautiful nutrition management platform with dual dashboards using AntDesign component library.

Features for v1:
- Nutritionist dashboard: 
   - profile: bio, specializations, pricing, stats
   - client list: searchable client list with progress tracking
   - calendar: weekly/monthly view with appointment management
   - notes: client observation cards with tags
   - chat - real-time messaging interface
   - video call - real-time video call interface with appointment
- Client dashboard: 
   - questionnaire: multi-step health onboarding,
   - calendar: weekly/monthly view with appointment booking with monthly view
   - diet plan: daily meals, macros, and weekly planning
- Administrator dashboard: 
   - statistic for visiting by nutritionist/clients.
   - see/manage appointments


The component should be accessible, test-covered, and integrate with the app's state (for local test) 
and  with backend API (for remote test).


## Stack:

- [React (v.19.*)](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Ant Design](https://ant.design/)
  

## Instruction for some packages installation:

**Note:** part of instructions about packages installation available in [fe -> project_setup](../fe/project_setup.md).


### 1. Ant Design

**Install `Ant Design`**

```
npm install antd
npm install @ant-design/icons
npm install @ant-design/colors
```

Packages: 
- [antd](https://www.npmjs.com/package/antd) - An enterprise-class UI design language and React UI library.
- [@ant-design/icons](https://www.npmjs.com/package/@ant-design/icons) - Ant Design Icons for React.
- [@ant-design/colors](https://www.npmjs.com/package/@ant-design/colors) - color palettes calculator of Ant Design