import { platformUpdate } from '../models/platformUpdate';
import { PlatformUpdate } from '../types';
import { seedTable } from './seedTable';

const data: PlatformUpdate[] = [
  {
    // Scenario: Future start and end dates (not displayed)
    id: '1d8b69ab-4f6d-4a56-bd7d-0cddf2a7b9d6',
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-01T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'Scheduled maintenance on 2024-01-15.',
    startDate: '2024-01-15',
    endDate: new Date('2024-01-15T12:00:00Z'),
    enabled: true,
  },
  {
    // Scenario: Past start date and future end date (displayed)
    id: '2f9c2d69-a1d8-41a6-9b4b-0d1d9f1b9e3c',
    createdAt: new Date('2024-04-10T10:00:00Z'),
    updatedAt: new Date('2024-04-10T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'Bug fix deployed.',
    startDate: '2024-04-10',
    endDate: new Date('2024-12-31T23:59:59Z'),
    enabled: true,
  },
  {
    // Scenario: Past start and end dates (historical)
    id: '3b7d2c5a-bd8f-4a76-8a1b-1cdd2f8e6a3e',
    createdAt: new Date('2023-12-01T10:00:00Z'),
    updatedAt: new Date('2023-12-01T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'Service downtime for upgrade.',
    startDate: '2023-12-10',
    endDate: new Date('2023-12-10T12:00:00Z'),
    enabled: false,
  },
  {
    // Scenario: Immediate start and end dates (displayed)
    id: '4e8c6d2b-7d9a-4c7b-8a1e-2f8e6a7b3c5a',
    createdAt: new Date('2024-05-10T10:00:00Z'),
    updatedAt: new Date('2024-05-10T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'New feature release: User profiles.',
    startDate: '2024-05-11',
    endDate: new Date('2024-06-11T23:59:59Z'),
    enabled: true,
  },
  {
    // Scenario: Immediate start, end date passed (historical)
    id: '5f1d7b3a-2c5e-4d8f-8a7b-1b9e3c4a2d1f',
    createdAt: new Date('2024-02-15T10:00:00Z'),
    updatedAt: new Date('2024-02-15T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'Critical security update.',
    startDate: '2024-02-16',
    endDate: new Date('2024-02-16T12:00:00Z'),
    enabled: true,
  },
  {
    // Scenario: Past start and future end date (displayed)
    id: '6a1e7b3d-2c6e-4d8f-9a7b-2c9e4f1d1c3a',
    createdAt: new Date('2024-01-20T10:00:00Z'),
    updatedAt: new Date('2024-01-20T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'System performance improvements.',
    startDate: '2024-01-21',
    endDate: new Date('2024-12-31T23:59:59Z'),
    enabled: true,
  },
  {
    // Scenario: Future start date (not displayed)
    id: '7b2d8c5f-3d7a-4e7b-9c7a-3d8f2e1c2b4e',
    createdAt: new Date('2024-06-01T10:00:00Z'),
    updatedAt: new Date('2024-06-01T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'Upcoming feature release.',
    startDate: '2024-06-15',
    endDate: new Date('2024-06-15T12:00:00Z'),
    enabled: true,
  },
  {
    // Scenario: Past start and end dates, disabled (not displayed)
    id: '0ea1aad0-336c-46bd-8486-75017bc7e763',
    createdAt: new Date('2023-11-01T10:00:00Z'),
    updatedAt: new Date('2023-11-01T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'Minor bug fixes.',
    startDate: '2023-11-10',
    endDate: new Date('2023-11-10T12:00:00Z'),
    enabled: false,
  },
  {
    // Scenario: Ongoing maintenance (displayed)
    id: '82278feb-b3f0-4172-b002-6e13b8a83336',
    createdAt: new Date('2024-03-01T10:00:00Z'),
    updatedAt: new Date('2024-03-01T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'Ongoing maintenance work.',
    startDate: '2024-03-10',
    endDate: new Date('2024-06-10T12:00:00Z'),
    enabled: true,
  },
  {
    // Scenario: Immediate start, end date in future (displayed)
    id: '3037ca6f-6c33-4043-b9a1-a717d8ada626',
    createdAt: new Date('2024-04-15T10:00:00Z'),
    updatedAt: new Date('2024-04-15T10:00:00Z'),
    deletedAt: null,
    createdBy: 'admin',
    updatedBy: 'admin',
    deletedBy: null,
    message: 'Urgent maintenance work.',
    startDate: '2024-04-16',
    endDate: new Date('2024-07-16T12:00:00Z'),
    enabled: true,
  },
];

export const seedPlatformUpdate = async () => {
  await seedTable(platformUpdate, data, platformUpdate.id);
};
