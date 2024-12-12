import {
  ApiSeedsSpeciesList,
  rawApiSeedsSpeciesList,
} from '@/lib/mock/seeds-species-list';
import { FeatureCollection } from 'geojson';
import { useEffect, useState } from 'react';
import { transformSeedsSpeciesList } from '../custom/SeedsNearMe/Common/Constants';
import { SpeciesData } from './useSeedsSpeciesData';

export const useFetchSeedsSpecies = (geoJsonData: FeatureCollection | null) => {
  const [seedsSpeciesList, setSeedsSpeciesList] = useState<SpeciesData[]>(
    transformSeedsSpeciesList(rawApiSeedsSpeciesList)
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeciesList = async () => {
      if (
        !geoJsonData ||
        !geoJsonData.features ||
        geoJsonData.features.length === 0
      ) {
        setError('No geoJsonData available');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/seeds/list-species', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ geojson: geoJsonData.features[0] }),
        });

        // Default to mock data if the response is not ok
        let data: ApiSeedsSpeciesList = rawApiSeedsSpeciesList;

        if (response.ok) {
          data = await response.json();
        }

        setSeedsSpeciesList(transformSeedsSpeciesList(data));
      } catch (error) {
        console.error('Error fetching species list:', error);
        setError('Error fetching species list');
      } finally {
        setLoading(false);
      }
    };

    fetchSpeciesList();
  }, [geoJsonData]);

  return { seedsSpeciesList, error, loading };
};
