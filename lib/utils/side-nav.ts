import {
  CalendarDays,
  ClipboardListIcon,
  Database,
  MapPin,
  SearchIcon,
} from 'lucide-react';
import { type NavItem } from '@/lib/types/nav-item.type';
import {
  FilledBellPlus,
  FilledCircleWarning,
  WorldMap,
} from '@/components/icons';

export const getNavItems = (projectId: string, hasAlert=false, badgeCount=0): NavItem[] => {
  return [
    {
      title: 'Project Status',
      icon: WorldMap,
      href: `/project-management/details/${projectId}/project-status`,
      color: 'text-sky-500',
    },
    {
      title: 'Monitoring',
      icon: SearchIcon,
      href: `/project-management/details/${projectId}/monitoring`,
      color: 'text-sky-500',
      isChidren: true,
      children: [
        {
          title: 'Map',
          icon: MapPin,
          color: 'text-airseed-dark-blue',
          href: `/project-management/details/${projectId}/monitoring/map`,
        },
        {
          title: 'Data',
          icon: Database,
          color: 'text-airseed-dark-blue',
          href: `/project-management/details/${projectId}/monitoring/data`,
        },
        {
          title: 'Reports',
          icon: ClipboardListIcon,
          color: 'text-airseed-dark-blue',
          href: `/project-management/details/${projectId}/monitoring/reports`,
        },
      ],
    },
    {
      title: 'Activities',
      icon: CalendarDays,
      href: `/project-management/details/${projectId}/activities`,
      color: 'text-sky-500',
    },
    {
      title: 'Issues',
      icon: FilledCircleWarning,
      href: `/project-management/details/${projectId}/issues`,
      color: 'text-sky-500',
    },
    {
      title: 'Alerts',
      icon: FilledBellPlus,
      href: `/project-management/details/${projectId}/alerts`,
      color: 'text-sky-500',
      hasAlert: hasAlert,
      badgeCount: badgeCount,
    },
  ];
};
