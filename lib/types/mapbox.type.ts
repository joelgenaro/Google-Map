export interface MapboxGeocodeContext {
  id: string;
  mapbox_id: string;
  wikidata?: string;
  short_code?: string;
  text: string;
}

export interface MapboxGeocodeFeature {
  id: string;
  type: 'Feature';
  place_type: string[];
  relevance: number;
  properties: {
    mapbox_id: string;
    wikidata?: string;
    short_code?: string;
    full_address: string;
  };
  text: string;
  place_name: string;
  bbox?: number[];
  center: number[];
  geometry: {
    type: 'Point';
    coordinates: number[];
  };
  context?: MapboxGeocodeContext[];
}

export interface MapboxGeocodingResponse {
  type: 'FeatureCollection';
  query: number[];
  features: MapboxGeocodeFeature[];
  attribution: string;
}

export type FeatureCollectionOrNull = GeoJSON.FeatureCollection | null;