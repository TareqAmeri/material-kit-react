import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { _tasks } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

/**
 * PROJECTHUB DASHBOARD
 * 
 * Main dashboard view for project management platform
 * Features:
 * - Key metrics widgets (projects, tasks, team, hours)
 * - Project status distribution
 * - Team performance analytics
 * - Recent activity timeline
 * - Task management overview
 * - Quick action buttons
 * 
 * Theme: Dark Premium (#1e3c72, #2a5298, #0f2027)
 */
export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      {/* HEADER SECTION with Quick Actions */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: { xs: 3, md: 5 },
        }}
      >
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            Welcome back, Admin 👋
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Here&apos;s what&apos;s happening with your projects today
          </Typography>
        </Box>

        {/* QUICK ACTION BUTTONS */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Iconify icon={'solar:add-circle-bold' as any} />}
            sx={{
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
              boxShadow: '0 4px 12px rgba(42, 82, 152, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e3c72 20%, #2a5298 120%)',
                boxShadow: '0 6px 16px rgba(42, 82, 152, 0.4)',
              },
            }}
          >
            New Project
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon={'solar:user-plus-bold' as any} />}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'action.hover',
              },
            }}
          >
            Add Team Member
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* KEY METRICS WIDGETS */}
        
        {/* Active Projects */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Active Projects"
            percent={12.5}
            total={24}
            icon={<Iconify icon={'solar:folder-with-files-bold' as any} width={48} sx={{ color: 'primary.main' }} />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 20, 22, 21, 23, 24, 24],
            }}
          />
        </Grid>

        {/* Total Tasks */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Tasks"
            percent={8.2}
            total={156}
            color="secondary"
            icon={<Iconify icon={'solar:clipboard-check-bold' as any} width={48} sx={{ color: 'secondary.main' }} />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [120, 125, 135, 142, 148, 150, 154, 156],
            }}
          />
        </Grid>

        {/* Team Members */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Team Members"
            percent={5.3}
            total={48}
            color="warning"
            icon={<Iconify icon={'solar:users-group-rounded-bold' as any} width={48} sx={{ color: 'warning.main' }} />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [42, 43, 44, 45, 46, 46, 47, 48],
            }}
          />
        </Grid>

        {/* Hours Logged */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Hours Logged"
            percent={18.7}
            total={1248}
            color="error"
            icon={<Iconify icon={'solar:clock-circle-bold' as any} width={48} sx={{ color: 'error.main' }} />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [980, 1020, 1100, 1150, 1180, 1210, 1230, 1248],
            }}
          />
        </Grid>

        {/* PROJECT STATUS DISTRIBUTION */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Project Status"
            chart={{
              series: [
                { label: 'Active', value: 14 },
                { label: 'On Hold', value: 4 },
                { label: 'Completed', value: 5 },
                { label: 'Planning', value: 1 },
              ],
            }}
          />
        </Grid>

        {/* PROJECT PROGRESS OVER TIME */}
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Project Progress"
            subheader="Completed tasks per project over time"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'E-Commerce Platform', data: [12, 18, 25, 32, 38, 45, 52, 58, 65] },
                { name: 'Mobile App Redesign', data: [8, 15, 22, 30, 35, 42, 48, 55, 60] },
                { name: 'Marketing Campaign', data: [5, 10, 15, 20, 28, 35, 40, 45, 48] },
              ],
            }}
          />
        </Grid>

        {/* TEAM PERFORMANCE */}
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Team Performance"
            subheader="Task completion rate by team"
            chart={{
              categories: ['Development', 'Design', 'Marketing', 'QA', 'Management'],
              series: [
                { name: 'Q1 2024', data: [78, 85, 72, 88, 82] },
                { name: 'Q2 2024', data: [82, 88, 78, 92, 85] },
              ],
            }}
          />
        </Grid>

        {/* RESOURCE ALLOCATION */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject
            title="Resource Allocation"
            chart={{
              categories: ['Development', 'Design', 'Testing', 'Documentation', 'Planning', 'Review'],
              series: [
                { name: 'Current Sprint', data: [85, 70, 60, 45, 75, 55] },
                { name: 'Previous Sprint', data: [75, 65, 55, 40, 70, 50] },
              ],
            }}
          />
        </Grid>

        {/* RECENT ACTIVITY TIMELINE */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline 
            title="Recent Activity" 
            list={[
              {
                id: '1',
                title: 'Project milestone completed',
                type: 'order1',
                time: '2 hours ago',
              },
              {
                id: '2',
                title: 'New team member added',
                type: 'order2',
                time: '5 hours ago',
              },
              {
                id: '3',
                title: 'Sprint planning completed',
                type: 'order3',
                time: '1 day ago',
              },
              {
                id: '4',
                title: 'Code review approved',
                type: 'order4',
                time: '1 day ago',
              },
              {
                id: '5',
                title: 'Client feedback received',
                type: 'order5',
                time: '2 days ago',
              },
            ]} 
          />
        </Grid>

        {/* ACTIVE TASKS */}
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTasks 
            title="Active Tasks" 
            list={_tasks} 
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
