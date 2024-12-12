'use client';

import useGeocoding, { Suggestion } from '@/components/hooks/useGeocoding';
import { Input } from '@/components/ui/input';
import { env } from '@/env';
import { LoaderCircleIcon } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddressSearchFieldProps {
  onSelectSuggestion: (suggestion: Suggestion) => void;
}

const AddressSearchField = ({
  onSelectSuggestion,
}: AddressSearchFieldProps) => {
  const { register, setValue } = useForm<{ address: string }>();
  const [inputValue, setInputValue] = useState('');
  const [hasSelectedSuggestion, setHasSelectedSuggestion] = useState(false);
  const { fetchSuggestions, suggestions, loading, error } = useGeocoding(
    env.NEXT_PUBLIC_MAPBOX_TOKEN
  );

  // Handler for input changes to manage local state and fetch suggestions
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (newValue.length >= 3) {
      fetchSuggestions(newValue);
    } else {
      setHasSelectedSuggestion(false);
    }
  };

  // Handler for selecting a suggestion
  const handleSelectSuggestion = (suggestion: Suggestion) => {
    // Set input to the selected address name
    setInputValue(suggestion.place_name);
    // Propagate the suggestion to the parent component
    onSelectSuggestion(suggestion);
    // Update react-hook-form's value
    setValue('address', suggestion.place_name);
    setHasSelectedSuggestion(true);
  };

  useEffect(() => {
    // Register the input for react-hook-form without using watch
    register('address');
  }, [register]);

  return (
    <>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter address"
          value={inputValue}
          {...register('address')}
          onChange={handleChange}
        />
      </div>
      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <LoaderCircleIcon className="h-12 w-12 animate-spin" />
          <span>Loading ...</span>
        </div>
      )}
      {!loading &&
        !error &&
        suggestions.length > 0 &&
        !hasSelectedSuggestion && (
          <ul className="mt-1 max-h-28 w-full overflow-auto border border-gray-300 bg-white shadow-md md:max-h-40">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="list-group-item cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
      {!loading && error && !suggestions.length && (
        <div className="flex flex-1 items-center justify-center">
          <span>An error occurred</span>
        </div>
      )}
      {!loading && !error && !suggestions.length && (
        <div className="flex flex-1 items-center justify-center">
          <span>No suggestions found</span>
        </div>
      )}
    </>
  );
};

/**
 * AddressSearchField component. (This can be reused in other pages)
 * @param {Object} props - Props for the AddressSearchField component
 * @param {Function} props.onSelectSuggestion - Function to handle when a suggestion is selected
 * @returns {React.Component} AddressSearchField component
 */
export default memo(AddressSearchField);
