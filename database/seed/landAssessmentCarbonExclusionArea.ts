import { landAssessmentCarbonExclusionArea } from '../schema';
import { LandAssessmentCarbonExclusionArea } from '../types';
import { seedTable } from './seedTable';

const data: LandAssessmentCarbonExclusionArea[] = [
  {
    id: '7b8931a0-8c9a-484a-bfa7-780dde01ebda',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: '0a106ddad06391cc92ca41ccf2b4759f',
          type: 'Feature',
          properties: {},
          geometry: {
            coordinates: [
              [151.11024038316236, -33.94029796600099],
              [151.11748198336448, -33.93723777097513],
              [151.1171022739893, -33.93899289627948],
              [151.12079087933773, -33.937372781898745],
            ],
            type: 'LineString',
          },
        },
      ],
    },
  },
  {
    id: '55d466ed-529d-4762-ba96-34be4df50246',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: 'ab0f332abb4d10ac08e1548fb799de42',
          type: 'Feature',
          properties: {},
          geometry: {
            coordinates: [
              [
                [144.64396049242868, -38.145308365597806],
                [144.6724997045111, -38.187257889404755],
                [144.6331031834859, -38.210904822641105],
                [144.60053125665212, -38.16140813016127],
                [144.64396049242868, -38.145308365597806],
              ],
            ],
            type: 'Polygon',
          },
        },
      ],
    },
  },
  {
    id: '176be875-978a-4c26-986e-26a0d7b5aef6',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: '1d129560eb1e17c414c2e6242e606329',
          type: 'Feature',
          properties: {},
          geometry: {
            coordinates: [
              [
                [135.5183037919444, -34.186372029685536],
                [135.72865235708815, -34.401043185364195],
                [135.5028369856817, -34.401043185364195],
                [135.5183037919444, -34.186372029685536],
              ],
            ],
            type: 'Polygon',
          },
        },
      ],
    },
  },
  {
    id: '25e23bd7-aef5-4231-9ea5-f8f4edab842c',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: 'ef58480f927a4aa2d66b59e115e97c35',
          type: 'Feature',
          properties: {},
          geometry: {
            coordinates: [
              [
                [151.09276067900765, -33.94797092871001],
                [151.11852738307266, -33.95067084054776],
                [151.11735205972815, -33.94587093806573],
                [151.09276067900765, -33.94797092871001],
              ],
            ],
            type: 'Polygon',
          },
        },
      ],
    },
  },
];

export const seedLandAssessmentCarbonExclusionArea = async () => {
  await seedTable(
    landAssessmentCarbonExclusionArea,
    data,
    landAssessmentCarbonExclusionArea.id
  );
};
