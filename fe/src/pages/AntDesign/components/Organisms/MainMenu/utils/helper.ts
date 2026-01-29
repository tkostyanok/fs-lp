import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

/**
   * Note: do not change key orders.
   * Reason: Keys present in order how data should be shown in the Menu.
   */
export const getItem = (
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  return {
    key,
    label,
    icon,
    children,
  } as MenuItem;
};

