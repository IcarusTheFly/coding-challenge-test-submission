import React from 'react';

interface FormFields {
  [key: string]: string;
}

interface UseFormFieldsReturn {
  fields: FormFields;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setField: (name: string, value: string) => void;
  updateFields: (newFields: Partial<FormFields>) => void;
  clearFields: () => void;
}

export default function useFormFields(initialFields: FormFields): UseFormFieldsReturn {
  const [fields, setFields] = React.useState<FormFields>(initialFields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const setField = (name: string, value: string) => {
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const updateFields = (newFields: Partial<FormFields>) => {
    setFields(prev => ({ ...prev, ...(newFields as FormFields) }));
  };

  const clearFields = () => {
    setFields(initialFields);
  };

  return {
    fields,
    handleChange,
    setField,
    updateFields,
    clearFields,
  };
}
