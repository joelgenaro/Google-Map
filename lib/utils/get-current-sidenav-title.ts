import { NavItem } from '../types/nav-item.type';

export const GetCurrentSidenavTitle = (
  items: NavItem[],
  path: string,
  onItemClicked?: (title: string) => void
) => {
  items.some((item) => {
    if (item.href === path) {
      onItemClicked?.(item.title);
      return true;
    }

    if (
      item.children?.some((child) => {
        if (child.href === path) {
          onItemClicked?.(child.title);
          return true;
        }
        return false;
      })
    ) {
      return true;
    }

    return false;
  });
};
