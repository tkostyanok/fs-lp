import type { ThemeConfig } from 'antd';
import {
  blue, green, orange 
} from '@ant-design/colors';

import { TRANSPARENT } from '../constants/colors';

export const antTheme: ThemeConfig = {
  'token': {
    // 'borderRadius': 8,
    'colorPrimaryBorder': blue[7],
    'colorBgLayout': blue[1],
    // 'colorBgContainer': purple[0],
    // 'colorBorderSecondary': purple[2],
    // 'colorBgHeader': WHITE,
    'colorPrimary': blue[7],
    'colorInfo': blue[7],
    // 'colorLink': green[7],
    'colorSuccess': green[7],
    'colorWarning': orange[6],
  },
  'components': {
    'Menu': {
      // 'itemColor': purple[7],
      'itemHoverColor': blue[7],
      // 'itemSelectedColor': blue[7],
      'itemSelectedBg': blue[1],
      'itemHoverBg': blue[0],
      'itemBg': TRANSPARENT, // common background color for menu
      'subMenuItemSelectedColor': blue[7],
    },
    'Layout': {
      'headerBg': blue[0],
      // 'siderBg': WHITE,
    },
  }
};
