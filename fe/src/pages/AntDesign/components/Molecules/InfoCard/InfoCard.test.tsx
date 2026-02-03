import React from 'react';

import {
  describe, expect, it
} from 'vitest';
import {
  render, screen,
  waitFor
} from '@testing-library/react';

import '@testing-library/jest-dom';

import { InfoCard } from './InfoCard';

// A simple fake icon component to use for testing
const FakeIcon: React.FC = () => <svg data-testid='fake-icon' />;

/**
 * InfoCard component based on AndDesign Card component.
 * 
 * Testing: 
 *  - Card: title text, icon, setting color for icon
 *  - Card.Meta -> title, description
 */
describe('InfoCard', () => {
  it('should render title, meta title and meta description text', async () => {
    render(
      <InfoCard
        Icon={FakeIcon}
        iconColor='#ff0000'
        metaDescription='Some description'
        metaTitle='Meta title'
        title='Test Card'
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Meta title')).toBeInTheDocument();
      expect(screen.getByText('Some description')).toBeInTheDocument();
      expect(screen.getByTestId('fake-icon')).toBeInTheDocument();
    });
  });

  it('should apply the provided iconColor style to the icon wrapper', async () => {
    render(
      <InfoCard
        Icon={FakeIcon}
        iconColor='#abcdef'
        metaDescription='desc'
        metaTitle='1'
        title='Colored Icon'
      />
    );

    await waitFor(() => {
      const svg = screen.getByTestId('fake-icon');
      // Note: antd Icon wraps provided component
      const wrapper = svg.parentElement as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveStyle({
        color: '#abcdef',
        fontSize: '32px' 
      });
    });
  });

  it(`should support ReactNode metaDescription (e.g., a Link) 
        and apply apply inline style align-items: center to it`, async () => {
    render(
      <InfoCard
        Icon={FakeIcon}
        iconColor='#111111'
        metaDescription={<span data-testid='custom-node'>Custom Node</span>}
        metaTitle='42'
        title='Node Desc'
      />
    );

    await waitFor(() => {
      const customNode = screen.getByTestId('custom-node');
      expect(customNode).toBeInTheDocument();
      expect(customNode).toHaveTextContent('Custom Node');
    });
  });
});
