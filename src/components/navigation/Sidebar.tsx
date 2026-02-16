import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  children?: Omit<SidebarItem, 'children'>[];
}

export interface SidebarProps {
  items: SidebarItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  collapsible = true,
  defaultCollapsed = false,
  logo,
  footer,
  className,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string>(window.location.pathname);

  const toggleExpanded = (href: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (href: string) => {
    return activeItem === href || activeItem.startsWith(href + '/');
  };

  const renderItem = (item: SidebarItem, isChild = false) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.href);
    const active = isActive(item.href);

    return (
      <li key={item.href}>
        <a
          href={hasChildren ? undefined : item.href}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.href);
            } else {
              setActiveItem(item.href);
            }
          }}
          className={cn(
            'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isChild && 'pl-11',
            active
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100',
            hasChildren && 'cursor-pointer'
          )}
        >
          <Icon className={cn('h-5 w-5 flex-shrink-0', active && 'text-blue-600')} />

          {!isCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>

              {item.badge && (
                <span className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-semibold',
                  active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                )}>
                  {item.badge}
                </span>
              )}

              {hasChildren && (
                <ChevronRight
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded && 'rotate-90'
                  )}
                />
              )}
            </>
          )}
        </a>

        {hasChildren && isExpanded && !isCollapsed && (
          <ul className="mt-1 space-y-1">
            {item.children!.map((child) => renderItem(child, true))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Logo */}
      {logo && (
        <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
          {logo}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {items.map((item) => renderItem(item))}
        </ul>
      </nav>

      {/* Footer */}
      {footer && !isCollapsed && (
        <div className="border-t border-gray-200 p-4">
          {footer}
        </div>
      )}

      {/* Collapse Toggle */}
      {collapsible && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'flex items-center justify-center border-t border-gray-200 py-4 text-gray-600 transition-colors hover:bg-gray-100',
            isCollapsed && 'px-4'
          )}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-2 text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      )}
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
