import { Outlet } from 'react-router';

import {
  ConfigProvider, Layout 
} from 'antd';

import { antTheme } from './styles/ant-theme';
import { MainMenu } from './components';

const {
  Header, Content, Sider 
} = Layout;

export const AntDesign = () => {
  return (
    <ConfigProvider theme={antTheme}>
      <Layout
        style={{ 
          minHeight: '100vh'
        }}
      >
        <Sider
          style = {{
            borderRight: `1px solid ${antTheme.token?.colorPrimaryBorder}`,
          }}
        >
          <MainMenu />
        </Sider>

        <Layout
          style={{
            padding: 0,
          }}
        >
          <Header 
            style={{ 
              borderBottom: `1px solid ${antTheme.token?.colorPrimaryBorder}`,
              height: 48,
              padding: 0
            }}
          >
            Header here 
          </Header>

          <Content 
            style={{
              borderRadius: 0,
              margin: '0 16px ',
              padding: 0
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

