"use client"

import { env } from '@/env';
import { SearchBoxRetrieveResponse } from '@mapbox/search-js-core';
import { SearchBox } from '@mapbox/search-js-react';
import { Control, Controller } from 'react-hook-form';

interface FormData {
  projectName: string;
  landholderName: string;
  address: string;
}

interface SearchBoxInputProps {
  control: Control<FormData>;
  name: "projectName" | "landholderName" | "address";
}

export function SearchBoxInput({ control, name }: SearchBoxInputProps) {
  const SearchBoxComponent = SearchBox as any;
  return (
    <div className="custom-mapbox-searchbox">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <SearchBoxComponent
            {...field}
            accessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
            options={{ language: 'en', country: 'AU' }}
            placeholder="Address"
            onRetrieve={(e: SearchBoxRetrieveResponse) => {
              field.onChange(e.features[0]?.properties.full_address || e.features[0]?.properties.address);
            }}
          />
        )}
      />
    </div>
  );
}
