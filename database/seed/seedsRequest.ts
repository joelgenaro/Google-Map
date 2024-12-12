import { seedsRequest } from '../models/seedsRequest';
import { SeedsRequest } from '../types';
import { seedTable } from './seedTable';

const data: SeedsRequest[] = [
  {
    id: 'lwd1g9rmw2jd',
    createdAt: new Date('2024-05-19 12:29:39.886'),
    createdBy: 'Admin User',
    projectId: 'c4beb896-0e84-4367-8c8c-2eed87f962b5',
    requiredDate: '2024-05-23',
    seedTreatment: true,
    seedViability: true,
    seedProvenance: false,
    seedsSpecies: [
      {
        id: 1,
        seedSpecies: 'Acacia disholmii',
        selected: true,
        quantity: 500,
      },
      {
        id: 2,
        seedSpecies: 'Acacia longifolia',
        selected: true,
        quantity: 299,
      },
      {
        id: 3,
        seedSpecies: 'Banksia serrata',
        selected: true,
        quantity: 159,
      },
    ],
    status: 'REQUESTED',
  },
  {
    id: 'lwd1xfxjw4er',
    createdAt: new Date('2024-05-19 12:43:01.033'),
    createdBy: 'Admin User',
    projectId: '55d466ed-529d-4762-ba96-34be4df50246',
    requiredDate: '2024-05-31',
    seedTreatment: true,
    seedViability: true,
    seedProvenance: true,
    seedsSpecies: [
      {
        id: 1,
        seedSpecies: 'Acacia disholmii',
        selected: true,
        quantity: 123,
      },
      {
        id: 2,
        seedSpecies: 'Acacia longifolia',
        selected: true,
        quantity: 321,
      },
      {
        id: 3,
        seedSpecies: 'Banksia serrata',
        selected: true,
        quantity: 456,
      },
      {
        id: 4,
        seedSpecies: 'Caladenia flava',
        selected: true,
        quantity: 654,
      },
      {
        id: 5,
        seedSpecies: 'Drosera rotundifolia',
        selected: true,
        quantity: 234,
      },
    ],
    status: 'REQUESTED',
  },
];

export const seedSeedsRequest = async () => {
  await seedTable(seedsRequest, data, seedsRequest.id);
};
