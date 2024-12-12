'use client';
import React from 'react';

import { cn } from '@/lib/utils';
import { SideNav } from './side-nav';
import { getNavItems } from '@/lib/utils/side-nav';

interface SidebarProps {
  className?: string;
  projectID: string;
  hasAlert?: boolean;
  badgeCount?: number;
  onItemClicked?: (title: string) => void;
}

export default function Sidebar({
  className,
  projectID,
  hasAlert,
  badgeCount,
  onItemClicked,
}: SidebarProps) {
  return (
    <nav
      className={cn(`relative hidden w-56 border-r pt-12 md:block`, className)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <SideNav
              items={getNavItems(projectID, hasAlert, badgeCount)}
              onItemClicked={(title) => {
                onItemClicked && onItemClicked(title);
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
