import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

// AUTHENTICATION
export const SignInPage = lazy(() => import('src/pages/sign-in'));

// DASHBOARD & MAIN PAGES
export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const ProjectsPage = lazy(() => import('src/pages/projects'));
export const TasksPage = lazy(() => import('src/pages/tasks'));
export const TimesheetPage = lazy(() => import('src/pages/timesheet'));
export const CalendarPage = lazy(() => import('src/pages/calendar'));
export const TeamPage = lazy(() => import('src/pages/team'));
export const ChatPage = lazy(() => import('src/pages/chat'));
export const FilesPage = lazy(() => import('src/pages/files'));
export const ReportsPage = lazy(() => import('src/pages/reports'));
export const RisksPage = lazy(() => import('src/pages/risks'));
export const IssuesPage = lazy(() => import('src/pages/issues'));
export const SettingsPage = lazy(() => import('src/pages/settings'));

// ERROR PAGES
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    // MAIN APP LAYOUT with sidebar navigation
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      // Default route redirects to dashboard
      { path: '/', element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'timesheet', element: <TimesheetPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'files', element: <FilesPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'risks', element: <RisksPage /> },
      { path: 'issues', element: <IssuesPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    // AUTHENTICATION LAYOUT (centered, no sidebar)
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    // ERROR PAGES
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
