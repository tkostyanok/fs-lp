import { Outlet } from 'react-router';

import {
  ConfigProvider, Layout
} from 'antd';
import {
  MainHeader,
  MainMenu 
} from 'src/pages/AntDesign/components';
import { WHITE } from 'src/pages/AntDesign/constants/colors';
import { antTheme } from 'src/pages/AntDesign/styles/ant-theme';

const {
  Content, Sider 
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
            backgroundColor: WHITE
          }}
        >
          <MainMenu />
        </Sider>

        <Layout
          style={{
            padding: 0,
          }}
        >
          <MainHeader>
            <>some header will be here</>
          </MainHeader>

          <Content 
            style={{
              borderRadius: 0,
              margin: '24px ',
              padding: '16px'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

