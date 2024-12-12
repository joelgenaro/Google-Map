import { Cow, Seed, Tractor, Tree } from '@/components/icons';
import { InputFieldConfig } from './types/filter-bar.type';
import { polygonStyleBlue, polygonStyleGreen, polygonStyleRed } from './helper';

export const profileType = ['Organization', 'Individual', 'Other'];

export const userType = [
  'General Landholder',
  'Hobby Farmer',
  'Commercial Farmer',
  'Land Managers',
  'Carbon Developer',
];

export const registerReason = [
  'To manage multiple projects',
  'Scoping tool',
  'Interested in developing a carbon project on my land',
  'Other',
];

export const monitoringTiming = [
  'Post-Planting',
  'Pre-Planting',
  'Scoping',
  'Drought response',
  'Fire scar ground truthing',
  'Flood effect'
];

export const reportActionType = [
  'Planting',
  'Weed spray',
  'Monitoring',
  'Fence inspection'
]

export const logIssueType = [
  'Planting health',
  'Weeds',
  'Weather event',
  'Infrastructure',
  'Management'
]

export const statusType = [
  'Immediate action required',
  'Action required',
  'Resolved'
]

export const reportMethodType = [
  'EP',
  'PF',
  'HIR',
  'SC'
]

export const reportStatusType = [
  "Available",
  "In-Progress"
]

export const RedPolygon = [
  // Active features
  {
    id: 'gl-draw-polygon-fill-active',
    type: 'fill',
    filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    paint: {
      'fill-color': '#f00', // red color
      'fill-opacity': 0.4,
    },
  },
  {
    id: 'gl-draw-line-active',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#f00', // red color
      'line-width': 2,
    },
  },
  // Style for active polygon outline
  {
    id: 'gl-draw-polygon-stroke-active',
    type: 'line',
    filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#f00', // red color
      'line-width': 2,
    },
  },
  // Inactive features
  {
    id: 'gl-draw-polygon-fill-static',
    type: 'fill',
    filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon']],
    paint: {
      'fill-color': '#f00', // red color
      'fill-opacity': 0.3,
    },
  },
  // Style for inactive polygon outline
  {
    id: 'gl-draw-polygon-stroke-static',
    type: 'line',
    filter: ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#f00', // red color
      'line-width': 2,
    },
  },
  {
    id: 'gl-draw-line-static',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'false']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#f00', // red color
      'line-width': 2,
    },
  },
  {
    id: 'gl-draw-polygon-midpoint',
    type: 'circle',
    filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
    paint: {
      'circle-radius': 2,
      'circle-color': '#f00',
    },
  },
  // Style for vertices (large dots at the corners when drawing/editing)
  {
    id: 'gl-draw-polygon-and-line-vertex-active',
    type: 'circle',
    filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'vertex']],
    paint: {
      'circle-radius': 3,
      'circle-color': '#f00',
    },
  },
];

export const CarbonMethodOptions = [
  { icon: Seed, title: 'Environmental Planting', url: '/project-management/environmental-planting'},
  { icon: Tree, title: 'Plantation Forestry', url: '/project-management/project-methodology'},
  { icon: Cow, title: 'Human-Induced Reforestation', url: '/project-management/project-methodology'},
  { icon: Tractor, title: 'Soil Carbon', url: '/project-management/project-methodology'},
];

export const AlertColumnHeaders = ['alert', 'raiseIssue'];

export const fieldRequiredErrMsg = (fieldName: string) =>
  `${fieldName} is required`;

export const fieldMustBeValidErrMsg = (fieldName: string, fieldType: string) =>
  `${fieldName} must be a valid ${fieldType}`;

export const LAND_ASSESSMENT_FILTER_BAR_CONFIG: InputFieldConfig[] = [
  {
    fieldName: 'mapView',
    fieldType: 'switch',
    fieldLabel: 'Map View',
  },
  {
    fieldName: 'carbonMethods',
    fieldType: 'checkbox-as-icon',
    fieldLabel: 'Carbon Methods',
    checkboxIconNames: [
      'environmentalPlanting',
      'plantation',
      'humanInducedReforestation',
      'soilCarbon',
    ],
  },
  {
    fieldName: 'criteria',
    fieldType: 'select',
    fieldLabel: 'Criteria',
    selectOptions: ['Project specification 1', 'Project specification 2'],
  },
  {
    fieldName: 'propertyArea',
    fieldType: 'select',
    fieldLabel: 'Property Area',
    selectOptions: ['Any', '> 10 ha', '> 100 ha', '> 1000 ha', '> 10000 ha'],
  },
  {
    fieldName: 'state',
    fieldType: 'select',
    fieldLabel: 'State',
    selectOptions: ['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'],
  },
];

export const MapColors = {
  blue: polygonStyleBlue,
  yellow: polygonStyleRed,
  red: polygonStyleRed,
  green: polygonStyleGreen,
};