import {
  describe, expect,it 
} from 'vitest';
import {
  render, screen, waitFor 
} from '@testing-library/react';

import { BasicInput } from './BasicInput';

import '@testing-library/jest-dom';

/**
 * BasicInput component based on MUI's TextField component.
 * Testing: text and attributes.
 */
describe('BasicInput', () => {
  it('renders the provided label text as an <h6>', async () => {
    render(<BasicInput label='Hello Input' />);
    
    await waitFor (() => {
      const label = screen.getByText('Hello Input');
      expect(label).toBeInTheDocument();
      expect(label.tagName.toLowerCase()).toBe('h6');
    });
  });

  it('renders loading state when isLoading is true (no textbox or label)', async () => {
    render(<BasicInput isLoading label='LabelShouldNotRender' />);

    await waitFor (() => {
      expect(screen.queryByRole('textbox')).toBeNull();
      expect(screen.queryByText('LabelShouldNotRender')).toBeNull();
    });
  });

  it('renders empty string when value is null', async () => {
    render(<BasicInput label='NullValue' value={null} />);

    await waitFor (() => {
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('');
    });
  });

  it('renders the provided value in the input', async () => {
    render(<BasicInput label='WithValue' value='abc' />);

    await waitFor (() => {
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('abc');
    });
  });

  it('forwards placeholder and name props and uses type="text"', async () => {
    render(<BasicInput label='Props' placeholder='Enter name' name='firstName' />);
    
    await waitFor (() => {
      const inputByPlaceholder = screen.getByPlaceholderText('Enter name') as HTMLInputElement;
      expect(inputByPlaceholder).toBeInTheDocument();
      expect(inputByPlaceholder).toHaveAttribute('type', 'text');
      expect(inputByPlaceholder).toHaveAttribute('name', 'firstName');
    });
  });
});
