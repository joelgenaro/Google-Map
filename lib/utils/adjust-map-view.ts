import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
  Point,
  Polygon,
} from 'geojson';
import mapboxgl from 'mapbox-gl';

/**
 * Adjust the map view based on the available GeoJSON data
 * @param map - The map object
 * @param draw - The MapboxDraw object
 * @param geoJsonData - The GeoJSON data
 * @returns void
 */
const adjustMapView = (
  map: mapboxgl.Map,
  draw: MapboxDraw,
  geoJsonData: FeatureCollection
) => {
  // Assign IDs and correct the orientation to follow the Right Hand Rule
  const correctedFeatures = geoJsonData.features.map(
    (feature) =>
      turf.rewind(feature, { mutate: true, reverse: false }) as Feature<
        Geometry,
        GeoJsonProperties
      >
  );

  const correctedGeoJsonData: FeatureCollection = {
    type: 'FeatureCollection',
    features: correctedFeatures,
  };

  // Initialize sources and layers on the map
  map.addSource('geojson-layer', {
    type: 'geojson',
    data: correctedGeoJsonData,
  });

  /**
   * Handle Point Features
   */
  const pointFeatures: Feature<Point>[] = correctedGeoJsonData.features.filter(
    (feature): feature is Feature<Point> => feature.geometry.type === 'Point'
  );

  if (pointFeatures.length > 0) {
    // Fit the map to the bounds of the points
    const allPoints = {
      type: 'FeatureCollection',
      features: pointFeatures,
    } as FeatureCollection<Point>;
    const pointsBound = turf.bbox(allPoints);
    map.fitBounds(
      [
        [pointsBound[0], pointsBound[1]],
        [pointsBound[2], pointsBound[3]],
      ],
      { padding: 50, duration: 0 }
    );
    // Add the draw control to the map
    map.addControl(draw);
    // For each point feature, add a marker to the map
    pointFeatures.forEach((pointFeature) => {
      const pointCoordinates = pointFeature.geometry.coordinates as [
        number,
        number,
      ];
      new mapboxgl.Marker({
        draggable: false,
        scale: 1.5,
      })
        .setLngLat(pointCoordinates)
        .addTo(map);
    });
  }

  /**
   * Handle Polygon Features
   */
  const polygonFeatures: Feature<Polygon>[] =
    correctedGeoJsonData.features.filter(
      (feature): feature is Feature<Polygon> =>
        feature.geometry.type === 'Polygon'
    );

  if (polygonFeatures.length > 0) {
    // Fit the map to the bounds of the polygons
    const allPolygons = {
      type: 'FeatureCollection',
      features: polygonFeatures,
    } as FeatureCollection<Polygon>;
    const polygonBounds = turf.bbox(allPolygons);
    map.fitBounds(
      [
        [polygonBounds[0], polygonBounds[1]],
        [polygonBounds[2], polygonBounds[3]],
      ],
      { padding: 100, duration: 0 }
    );
    // For each polygon feature, add a layer to the map
    polygonFeatures.forEach((polygonFeature) => {
      const layerId = `polygon-layer-${polygonFeature.id}`;
      // Only add the layer if it doesn't already exist to avoid performance issues
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: 'fill',
          source: 'geojson-layer',
          filter: ['==', ['geometry-type'], 'Polygon'],
          paint: {
            'fill-color': '#0080ff',
            'fill-opacity': 0.5,
          },
        });
      }
    });
  }
};

export default adjustMapView;
