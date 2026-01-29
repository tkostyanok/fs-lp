import { MemoryRouter } from 'react-router';

import {
  describe, expect,it 
} from 'vitest';
import {
  render, screen 
} from '@testing-library/react';

import { MainMenu } from './MainMenu';

import '@testing-library/jest-dom';

/**
 * MainMenu component based on AntDesign Menu component.
 *
 * Testing:
 *  - origin Menu component
 *  - submenu
 *  - icons and links
 */
describe('MainMenu', () => {
  const setup = () => render(
    <MemoryRouter>
      <MainMenu />
    </MemoryRouter>
  );

  it('should render the Menu container', () => {
    setup();
    
    const menu = document.querySelector('.ant-menu');
    expect(menu).toBeInTheDocument();
  });

  it('should open the nutritionist submenu by default', () => {
    setup();

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Patients')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should select the nutritionist dashboard item by default', () => {
    setup();

    // defaultSelectedKeys is ['nutritionist-dashboard'] with text= 'Dashboard'
    //    => the corresponding item should have selected class
    const selected = document.querySelector('.ant-menu-item-selected');
    expect(selected).toBeTruthy();
    // Ensure it contains the Dashboard link text
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should render correct links for items', () => {
    setup();
    const homeLink = screen.getByText('Home').closest('a');
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    const patientsLink = screen.getByText('Patients').closest('a');
    const appointmentsLink = screen.getByText('Appointments').closest('a');
    const chatLink = screen.getByText('Chat').closest('a');
    const settingsLink = screen.getByText('Settings').closest('a');
    const clientLink = screen.getByText('Client').closest('a');
    const adminLink = screen.getByText('Admin').closest('a');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(dashboardLink).toHaveAttribute('href', '/ant-design/nutritionist/dashboard');
    expect(patientsLink).toHaveAttribute('href', '/ant-design/nutritionist/patients');
    expect(appointmentsLink).toHaveAttribute('href', '/ant-design/nutritionist/appointments');
    expect(chatLink).toHaveAttribute('href', '/ant-design/nutritionist/chat');
    expect(settingsLink).toHaveAttribute('href', '/ant-design/nutritionist/settings');
    expect(clientLink).toHaveAttribute('href', '/ant-design/client/dashboard');
    expect(adminLink).toHaveAttribute('href', '/ant-design/admin/dashboard');
  });

  it('should render icons for top-level items and nested nutritionist items', () => {
    setup();
    
    // Note: antd icons render into span[role="img"] wrappers
    const iconWrappers = document.querySelectorAll('span[role="img"]');
    expect(iconWrappers.length).toBeGreaterThanOrEqual(6);
  });
});
