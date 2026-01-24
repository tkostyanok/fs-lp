import type { ThemeConfig } from 'antd';
import { green } from '@ant-design/colors';

import { WHITE } from '../constants/colors';

export const antTheme: ThemeConfig = {
  "token": {
    "colorPrimaryBorder": green[2],
    "colorBgLayout": green[0],
    "colorBgContainer": green[0],
    // "colorBgHeader": WHITE,
    "colorPrimary": green[7],
    "colorInfo": green[7],
    "colorLink": green[7],
    "colorSuccess": green[7],
  },
  "components": {
    "Menu": {
      "colorItemText": green[7],
      "colorItemTextHover": green[7],
      "colorItemTextSelected": WHITE,
      "colorItemBgSelected": green[7],
      "colorItemBgHover": green[2],
      "itemBg": green[0],
      "subMenuItemSelectedColor": green[7],
    },
    "Layout": {
      "headerBg": green[0],
      "siderBg": green[0],
    },
    "Slider": {
      "handleColor": green[7],
      "colorBorder": green[2],
      
    }
  }
};
