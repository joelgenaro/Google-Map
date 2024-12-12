import { landAssessmentCarbonEstimationArea } from '../schema';
import { LandAssessmentCarbonEstimationArea } from '../types';
import { seedTable } from './seedTable';

const data: LandAssessmentCarbonEstimationArea[] = [
  {
    id: '7b8931a0-8c9a-484a-bfa7-780dde01ebda',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    carbonMethod: [
      'Environmental Planting',
      'Plantation Forestry',
      'Human-Induced Reforestation',
      'Soil Carbon',
    ],
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: '94d34d7e553b6a03f2af2bebc72395ae',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [151.11231575314645, -33.940748779501185],
                [151.1277418144282, -33.93757448811964],
                [151.13053551056663, -33.953847777491426],
                [151.11207282304878, -33.95062359580037],
                [151.11231575314645, -33.940748779501185],
              ],
            ],
          },
        },
      ],
    },
  },
  {
    id: '55d466ed-529d-4762-ba96-34be4df50246',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    carbonMethod: [
      'Environmental Planting',
      'Plantation Forestry',
      'Human-Induced Reforestation',
      'Soil Carbon',
    ],
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: '0ff4f59d222bdbbf841e9d224945ca46',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [144.3679815638261, -38.18281892207422],
                [144.42791492265422, -38.15934156869358],
                [144.47416107842736, -38.18607906747241],
                [144.49075162758487, -38.236592662062435],
                [144.40551768129296, -38.24359661741771],
                [144.3679815638261, -38.18281892207422],
              ],
            ],
          },
        },
      ],
    },
  },
  {
    id: '176be875-978a-4c26-986e-26a0d7b5aef6',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    carbonMethod: [
      'Environmental Planting',
      'Plantation Forestry',
      'Human-Induced Reforestation',
      'Soil Carbon',
    ],
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: 'dfad47b9ffb1380a9d64e053f801502e',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [135.5190408293272, -34.128916039966605],
                [135.7631058627412, -34.140722250545004],
                [135.76152102486225, -34.39611800742577],
                [135.5190408293272, -34.128916039966605],
              ],
            ],
          },
        },
      ],
    },
  },
  {
    id: '25e23bd7-aef5-4231-9ea5-f8f4edab842c',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    carbonMethod: [
      'Environmental Planting',
      'Plantation Forestry',
      'Human-Induced Reforestation',
      'Soil Carbon',
    ],
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: '06345b9802c59bc9b6601709da642b2f',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [151.11678317513383, -33.9567740360386],
                [151.1226798203516, -33.95762464512373],
                [151.1231925721081, -33.96343691293562],
                [151.11464670947572, -33.96301163851277],
                [151.11678317513383, -33.9567740360386],
              ],
            ],
          },
        },
      ],
    },
  },
];

export const seedLandAssessmentCarbonEstimationArea = async () => {
  await seedTable(
    landAssessmentCarbonEstimationArea,
    data,
    landAssessmentCarbonEstimationArea.id
  );
};
