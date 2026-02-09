import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when loading is true', () => {
    render(<Button loading={true}>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('shows loading spinner when loading is true', () => {
    render(<Button loading={true}>Click me</Button>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders correct variant class', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass('secondary');
  });
});
