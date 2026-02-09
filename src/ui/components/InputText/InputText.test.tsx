import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputText from './InputText';

describe('InputText Component', () => {
  test('renders with correct placeholder and value', () => {
    render(
      <InputText 
        name="testInput" 
        placeholder="Enter text" 
        value="Hello" 
        onChange={() => {}} 
      />
    );
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Hello');
  });

  test('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(
      <InputText 
        name="testInput" 
        placeholder="Enter text" 
        value="" 
        onChange={handleChange} 
      />
    );
    
    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'New Value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
