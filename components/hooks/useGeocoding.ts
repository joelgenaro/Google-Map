import { useState } from 'react';
import useDebounce from './useDebounce';

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Suggestion {
  place_name: string;
  center: Coordinates;
}

const useGeocoding = (accessToken: string) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedFetchSuggestions = useDebounce(async (searchText: string) => {
    setLoading(true);
    if (searchText.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${accessToken}&country=AU&autocomplete=true`;
      const response = await fetch(url);
      const data = await response.json();
      const newSuggestions = data.features.map((feature: any) => ({
        place_name: feature.place_name,
        center: { longitude: feature.center[0], latitude: feature.center[1] },
      }));
      setSuggestions(newSuggestions);
    } catch (err: any) {
      setError(`Failed to fetch suggestions - ${err.message}`);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 750);

  return {
    fetchSuggestions: debouncedFetchSuggestions,
    suggestions,
    loading,
    error,
  };
};

export default useGeocoding;
