import React from "react";

import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Form from "@/components/Form/Form";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import useAddressBook from "@/hooks/useAddressBook";
import useFormFields from "@/hooks/useFormFields";
import transformAddress from "./core/models/address";

import styles from "./App.module.css";
import { Address as AddressType } from "./types";

function App() {
  // Use custom hook for form fields
  const { fields, handleChange, clearFields, updateFields } = useFormFields({
    postCode: '',
    houseNumber: '',
    firstName: '',
    lastName: '',
    selectedAddress: '',
  });

  /**
   * Results states
   */
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  const [loading, setLoading] = React.useState(false);

  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /** Fetch addresses based on houseNumber and postCode using the local BE api */
  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear results fields but keep search inputs
    updateFields({ selectedAddress: '', firstName: '', lastName: '' });
    setAddresses([]);
    setError(undefined);
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || '';
      const response = await fetch(
        `${baseUrl}/api/getAddresses?postcode=${fields.postCode}&streetnumber=${fields.houseNumber}`
      );
      
      const data = await response.json();
      
      if (response.ok && data.status === 'ok') {
        // Transform addresses and add houseNumber to each
        const transformedAddresses = data.details.map((addr: any) => 
          transformAddress({ ...addr })
        );
        setAddresses(transformedAddresses);
      } else {
        setError(data.errormessage || 'An error occurred while fetching addresses');
      }
    } catch (err) {
      setError('Failed to fetch addresses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /** Add basic validation to ensure first name and last name fields aren't empty */
  const handlePersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate first name and last name
    if (!fields.firstName.trim() || !fields.lastName.trim()) {
      setError("First name and last name fields mandatory!");
      return;
    }

    if (!fields.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === fields.selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({ ...foundAddress, firstName: fields.firstName, lastName: fields.lastName });
    setError(undefined);
  };

  /** Clear all form fields, search results, and errors */
  const handleClearAll = () => {
    clearFields();
    setAddresses([]);
    setError(undefined);
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        <Form
          label="🏠 Find an address"
          loading={loading}
          formEntries={[
            {
              name: 'postCode',
              placeholder: 'Post Code',
              extraProps: { value: fields.postCode, onChange: handleChange }
            },
            {
              name: 'houseNumber',
              placeholder: 'House number',
              extraProps: { value: fields.houseNumber, onChange: handleChange }
            }
          ]}
          onFormSubmit={handleAddressSubmit}
          submitText="Find"
        />
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleChange}
              >
                <Address {...address} />
              </Radio>
            );
          })}
        {fields.selectedAddress && (
          <Form
            label="✏️ Add personal info to address"
            formEntries={[
              {
                name: 'firstName',
                placeholder: 'First name',
                extraProps: { value: fields.firstName, onChange: handleChange }
              },
              {
                name: 'lastName',
                placeholder: 'Last name',
                extraProps: { value: fields.lastName, onChange: handleChange }
              }
            ]}
            onFormSubmit={handlePersonSubmit}
            submitText="Add to addressbook"
          />
        )}

        <Button variant="secondary" onClick={handleClearAll}>
          Clear all fields
        </Button>

        {error && <ErrorMessage message={error} />}
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
