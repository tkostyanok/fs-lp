import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

import { BasicLabel } from './BasicLabel';

/**
 * BasicLabel component based on MUI's Typography component.
 * Testing: text and attributes.
 */
describe('BasicLabel', () => {
  it('renders the provided label text', () => {
    render(<BasicLabel label="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders as <h6> element', () => {
    render(<BasicLabel label="Variant Check" />);
    const el = screen.getByText('Variant Check');
    expect(el.tagName.toLowerCase()).toBe('h6');
  });

  it('supports rendering of empty string label', () => {
    render(<BasicLabel label="" />);
    const paragraphs = screen.getAllByText((content) => content === '' || content === undefined);
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('renders numeric-like labels as text without coercion issues', () => {
    render(<BasicLabel label={String(0)} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders special characters safely', () => {
    const special = 'Symbols: <>&"\'';
    render(<BasicLabel label={special} />);
    expect(screen.getByText(special)).toBeInTheDocument();
  });
});
