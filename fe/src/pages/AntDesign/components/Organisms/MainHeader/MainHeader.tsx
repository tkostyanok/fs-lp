import { Layout } from 'antd';

import type { MainHeaderProps } from './MainHeaderProps';
import { MAIN_HEADER_STYLES } from './MainHeaderStyles';

export const MainHeader = ({ children }: MainHeaderProps) => {
  return (
    <Layout.Header style={MAIN_HEADER_STYLES.header}>
      {children}
    </Layout.Header>
  );
};

