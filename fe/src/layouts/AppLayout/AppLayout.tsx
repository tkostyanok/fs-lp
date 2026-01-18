import { Suspense } from 'react';

import type { AppLayoutProps } from './AppLayoutProps';

import styles from './AppLayout.module.css';

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Suspense 
      fallback={<div>Loading...</div>}
    >
      <div className={styles['app-container']}>
        {children}
      </div>
    </Suspense>
  );
};
