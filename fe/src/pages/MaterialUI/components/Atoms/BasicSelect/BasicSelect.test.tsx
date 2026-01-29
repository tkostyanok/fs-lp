import {
  describe, expect, it 
} from 'vitest';
import {
  fireEvent, render, screen 
} from '@testing-library/react';

import { BasicSelect } from './BasicSelect';

import '@testing-library/jest-dom';

const OPTIONS = [
  {
    value: 'a',
    title: 'Option `string` with value `a`' 
  },
  {
    value: 1,
    title: 'Option `number` with value `1`' 
  },
];

describe('BasicSelect', () => {
  it('renders provided label', () => {
    render(
      <BasicSelect
        label='My label'
        name='Check label'
        options={[]}
      />
    );
    expect(screen.getByText('My label')).toBeInTheDocument();
  });

  it('renders loading state when isLoading is true (skips main UI)', () => {
    render(
      <BasicSelect
        isLoading
        label='Label should not render'
        name='Check loading state'
        options={[]}
      />
    );
    expect(screen.queryByText('Label should not render')).toBeNull();
    // No hidden input should be present when loading
    expect(document.querySelector('input')).toBeNull();
  });

  it('renders MenuItem with provided title and value', async () => {
    render(
      <BasicSelect
        currentValue={''}
        label='Check options'
        name='Check options'
        options={OPTIONS}
      />
    );

    // Open the MUI Select menu (MenuItems are rendered in a portal when opened)
    const button = screen.getByRole('combobox');
    fireEvent.mouseDown(button);
    
    expect(screen.getByText('Option `string` with value `a`')).toBeInTheDocument();
    expect(screen.getByText('Option `number` with value `1`')).toBeInTheDocument();
  });

  it('forwards name prop and currentValue via the hidden input element', () => {
    render(
      <BasicSelect 
        currentValue='a'
        label='Test current value as a string'
        name='test_string'
        options={OPTIONS}
      />
    );
    
    const hiddenInput = document.querySelector('input[name="test_string"]') as HTMLInputElement | null;
    expect(hiddenInput).not.toBeNull();
    // Note: MUI stores the current value as string in the hidden input
    expect(hiddenInput?.value).toBe('a');
  });

  it('handles numeric currentValue forwarded to hidden input', () => {
    render(
      <BasicSelect
        currentValue={1}
        label='Test current value as a number'
        name='test_number'
        options={OPTIONS}
      />
    );

    const hiddenInput = document.querySelector('input[name="test_number"]') as HTMLInputElement | null;
    expect(hiddenInput).not.toBeNull();
    // Note: MUI stores the current value as string in the hidden input
    expect(hiddenInput?.value).toBe('1');
  });
});