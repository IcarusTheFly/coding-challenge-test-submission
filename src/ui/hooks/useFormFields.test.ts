import { renderHook, act } from '@testing-library/react';
import useFormFields from './useFormFields';

describe('useFormFields', () => {
  const initialFields = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  };

  test('should initialize with provided fields', () => {
    const { result } = renderHook(() => useFormFields(initialFields));
    expect(result.current.fields).toEqual(initialFields);
  });

  test('should update a single field via handleChange', () => {
    const { result } = renderHook(() => useFormFields(initialFields));
    
    act(() => {
      const event = {
        target: { name: 'firstName', value: 'Jane' }
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleChange(event);
    });

    expect(result.current.fields.firstName).toBe('Jane');
    expect(result.current.fields.lastName).toBe('Doe'); // Should stay same
  });

  test('should update multiple fields via updateFields', () => {
    const { result } = renderHook(() => useFormFields(initialFields));
    
    act(() => {
      result.current.updateFields({ firstName: 'Bob', lastName: 'Smith' });
    });

    expect(result.current.fields.firstName).toBe('Bob');
    expect(result.current.fields.lastName).toBe('Smith');
  });

  test('should reset fields via clearFields', () => {
    const { result } = renderHook(() => useFormFields(initialFields));
    
    act(() => {
      result.current.updateFields({ firstName: 'Jane' });
      result.current.clearFields();
    });

    expect(result.current.fields).toEqual(initialFields);
  });
});
