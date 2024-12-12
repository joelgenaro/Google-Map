import { landAssessmentNewProject } from '../schema';
import { LandAssessmentNewProject } from '../types';
import { seedTable } from './seedTable';

const data: LandAssessmentNewProject[] = [
  {
    id: 'c4beb896-0e84-4367-8c8c-2eed87f962b5',
    userId: '3e713ebb-57bd-4c38-b4a2-783a947da24e',
    projectName: 'First Project Single Polygon - NSW',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: '599f28060e894895bb195a6c416b4333',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [151.11661862378492, -33.93516219012774],
                [151.1550270400162, -33.93867355625558],
                [151.15259344890467, -33.9579834813026],
                [151.14751465006515, -33.94288700446056],
                [151.13386537817934, -33.94139476540407],
                [151.1319608286155, -33.955964921487215],
                [151.11143401663332, -33.95324417813929],
                [151.10508551808448, -33.941131426384835],
                [151.11661862378492, -33.93516219012774],
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
    projectName: '2nd Project 1 Polygon - VIC',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: '41d6e3daab04dbbd119b64a800db0665',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [144.4288956703346, -38.15232535486223],
                [144.47300305532264, -38.17790089153932],
                [144.5557044021769, -38.170099136571636],
                [144.6527406491516, -38.132378881670995],
                [144.68361581864258, -38.18700188336859],
                [144.60587655260093, -38.28054608163298],
                [144.5149050710623, -38.25457365284344],
                [144.48844064006818, -38.27275532817335],
                [144.37376143909785, -38.27059108164368],
                [144.35832385435248, -38.17920110283361],
                [144.4288956703346, -38.15232535486223],
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
    projectName: '3rd Project 1 Polygon - SA',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: '15973f4fd40af45e4ea516ac76929da2',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [135.48614200836977, -34.102668811386245],
                [135.97021277737701, -34.116028661865265],
                [136.00571130043824, -34.43336950782259],
                [135.44418920838905, -34.44667691408273],
                [135.48614200836977, -34.102668811386245],
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
    projectName: '4th Project 1+ Polygons - NSW',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          id: 'edae5381e273a52e7d74cc361cdd19c4',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [151.1132358636853, -33.96473828303941],
                [151.1490879367605, -33.969325385585876],
                [151.1434582724762, -33.9859515537735],
                [151.10701360368392, -33.98046445873312],
                [151.1132358636853, -33.96473828303941],
              ],
            ],
          },
        },
        {
          id: '6288f3c5fc92957e2c6d80ea87af1cab',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [151.08617399337203, -33.951630938416685],
                [151.1158038053951, -33.95310561800112],
                [151.1043469447456, -33.97178268058193],
                [151.08923574061282, -33.97063596158133],
                [151.08617399337203, -33.951630938416685],
              ],
            ],
          },
        },
        {
          id: '405c39492cc646918b72f9bd41073c4b',
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [151.122519903657, -33.94474878747448],
                [151.1558040591657, -33.949828542556816],
                [151.1489892023988, -33.961625513533505],
                [151.12489028861972, -33.96154359576364],
                [151.122519903657, -33.94474878747448],
              ],
            ],
          },
        },
      ],
    },
  },
];

export const seedLandAssessmentNewProject = async () => {
  await seedTable(landAssessmentNewProject, data, landAssessmentNewProject.id);
};
