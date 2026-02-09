import transformAddress, { RawAddressModel } from './address';

describe('transformAddress', () => {
  const completeData: RawAddressModel = {
    city: 'Sydney',
    firstName: 'John',
    houseNumber: '123',
    id: 'old-id',
    lastName: 'Doe',
    postcode: '2000',
    street: 'Pitt St',
    lat: '-33.8688',
    lon: '151.2093'
  };

  test('should correctly transform complete address data', () => {
    const result = transformAddress(completeData);
    expect(result).toEqual({
      city: 'Sydney',
      firstName: 'John',
      houseNumber: '123',
      id: '-33.8688_151.2093',
      lastName: 'Doe',
      postcode: '2000',
      street: 'Pitt St'
    });
  });

  test('should provide default values for missing fields', () => {
    const incompleteData = {
      lat: '-33.8688',
      lon: '151.2093'
    } as RawAddressModel;

    const result = transformAddress(incompleteData);
    expect(result.city).toBe('');
    expect(result.firstName).toBe('');
    expect(result.houseNumber).toBe('');
    expect(result.lastName).toBe('');
    expect(result.postcode).toBe('');
    expect(result.street).toBe('');
  });

  test('should generate a fallback ID when lat/lon are missing', () => {
    const noCoordsData = {} as RawAddressModel;
    const result = transformAddress(noCoordsData);
    expect(result.id).toMatch(/^[\d.]+_[\d.]+$/);
  });
});
