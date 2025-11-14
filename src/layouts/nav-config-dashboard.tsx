import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

// PROJECT MANAGEMENT NAVIGATION - Complete menu for PM system
export const navData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: icon('ic-folder'),
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: icon('ic-kanban'),
  },
  {
    title: 'Timesheet',
    path: '/timesheet',
    icon: icon('ic-invoice'),
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: icon('ic-calendar'),
  },
  {
    title: 'Team',
    path: '/team',
    icon: icon('ic-user'),
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: icon('ic-chat'),
    info: (
      <Label color="info" variant="inverted">
        Soon
      </Label>
    ),
  },
  {
    title: 'Files',
    path: '/files',
    icon: icon('ic-file'),
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: icon('ic-external'),
  },
  {
    title: 'Risks',
    path: '/risks',
    icon: icon('ic-label'),
  },
  {
    title: 'Issues',
    path: '/issues',
    icon: icon('ic-disabled'),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: icon('ic-lock'),
  },
];
