import * as turf from '@turf/turf';
import { Feature } from 'geojson';

export const calculateTotalAreaInHectares = (geoJson: Feature[]): number => {
  let totalAreaMetersSquared = 0;

  for (const feature of geoJson) {
    const area = turf.area(feature);
    totalAreaMetersSquared += area;
  }

  // Convert from square meters to hectares (1 hectare = 10,000 square meters)
  return totalAreaMetersSquared / 10000;
};

export const isAreaGreaterThan = (
  areaHectares: number,
  propertyArea: string
): boolean => {
  // Extract the number from strings like '> 10 ha'
  const match = propertyArea.match(/>\s*(\d+)/);
  if (match && match[1]) {
    // Convert the string number to an integer
    const areaLimit = parseInt(match[1], 10);
    // Perform the comparison
    return areaHectares > areaLimit;
  }
  // If the string does not match the expected format, return false
  return false;
};
