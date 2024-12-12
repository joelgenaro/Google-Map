'use client';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/custom/layout/subnav-accordion';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { NavItem } from '@/lib/types/nav-item.type';
import { GetCurrentSidenavTitle } from '@/lib/utils/get-current-sidenav-title';
import { Badge } from '@/components/ui/badge';

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
  onItemClicked?: (title: string) => void;
}

export function SideNav({ items, setOpen, onItemClicked }: SideNavProps) {
  const path = usePathname();
  const [openItem, setOpenItem] = useState('');

  useEffect(() => {
    GetCurrentSidenavTitle(items, path, onItemClicked);
  }, []);

  return (
    <nav className="space-y-2">
      {items.map((item) =>
        item.isChidren ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none ">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline'
                )}
              >
                <div>
                  <item.icon className={cn('h-5 w-5', item.color)} />
                </div>
                <div className="absolute left-12 text-base duration-200 ">
                  {item.title}
                </div>

                <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="mt-2 space-y-4 pb-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                      if (onItemClicked) onItemClicked(child.title);
                    }}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'group relative flex h-12 justify-start gap-x-3',
                      path === child.href && 'bg-muted font-bold hover:bg-muted'
                    )}
                  >
                    <child.icon className={cn('h-5 w-5', child.color)} />
                    <div className="absolute left-12 text-base duration-200">
                      {child.title}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
              if (onItemClicked) onItemClicked(item.title);
            }}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'group relative flex h-12 items-center justify-start',
              path === item.href && 'bg-muted font-bold hover:bg-muted'
            )}
          >
            <item.icon className={cn('h-5 w-5', item.color)} />
            <span className="absolute left-12 text-base duration-200">
              {item.title}
            </span>
            {item.hasAlert && (
              <Badge className="absolute right-4 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-500">
                {item.badgeCount}
              </Badge>
            )}
          </Link>
        )
      )}
    </nav>
  );
}
