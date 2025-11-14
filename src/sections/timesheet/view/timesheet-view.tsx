import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * TIME ENTRY DATA TYPE
 */
type TimeEntry = {
  id: string;
  date: string;
  project: string;
  task: string;
  hours: number;
  description: string;
  billable: boolean;
  status: 'approved' | 'pending' | 'rejected';
};

/**
 * MOCK TIMESHEET DATA
 */
const MOCK_ENTRIES: TimeEntry[] = [
  {
    id: '1',
    date: '2024-11-14',
    project: 'E-Commerce Platform',
    task: 'Frontend Development',
    hours: 8,
    description: 'Implemented product listing page with filters and pagination',
    billable: true,
    status: 'approved',
  },
  {
    id: '2',
    date: '2024-11-14',
    project: 'Mobile App',
    task: 'UI Design',
    hours: 4,
    description: 'Created mockups for user profile screen',
    billable: true,
    status: 'approved',
  },
  {
    id: '3',
    date: '2024-11-13',
    project: 'E-Commerce Platform',
    task: 'Backend API',
    hours: 6,
    description: 'Developed REST endpoints for product management',
    billable: true,
    status: 'approved',
  },
  {
    id: '4',
    date: '2024-11-13',
    project: 'Marketing Campaign',
    task: 'Content Creation',
    hours: 3,
    description: 'Wrote blog posts and social media content',
    billable: false,
    status: 'pending',
  },
  {
    id: '5',
    date: '2024-11-12',
    project: 'Mobile App',
    task: 'Testing',
    hours: 5,
    description: 'Performed QA testing on authentication flow',
    billable: true,
    status: 'approved',
  },
  {
    id: '6',
    date: '2024-11-12',
    project: 'Data Analytics',
    task: 'Data Analysis',
    hours: 7,
    description: 'Analyzed user behavior patterns and created reports',
    billable: true,
    status: 'pending',
  },
  {
    id: '7',
    date: '2024-11-11',
    project: 'E-Commerce Platform',
    task: 'Code Review',
    hours: 2,
    description: 'Reviewed pull requests and provided feedback',
    billable: false,
    status: 'approved',
  },
  {
    id: '8',
    date: '2024-11-11',
    project: 'Security Audit',
    task: 'Security Testing',
    hours: 6,
    description: 'Conducted penetration testing and vulnerability assessment',
    billable: true,
    status: 'approved',
  },
  {
    id: '9',
    date: '2024-11-10',
    project: 'Mobile App',
    task: 'Development',
    hours: 8,
    description: 'Implemented push notification system',
    billable: true,
    status: 'approved',
  },
  {
    id: '10',
    date: '2024-11-10',
    project: 'Marketing Campaign',
    task: 'Meeting',
    hours: 2,
    description: 'Client meeting to discuss Q4 strategy',
    billable: true,
    status: 'pending',
  },
];

/**
 * TIMESHEET VIEW COMPONENT
 * 
 * Time tracking and management interface
 * Features:
 * - Weekly timesheet entries table
 * - Summary statistics (total hours, billable, projects)
 * - Time entry status (approved, pending, rejected)
 * - Project and task breakdown
 * - Billable vs non-billable tracking
 * - Dark Premium Theme styling
 */
export function TimesheetView() {
  const [entries] = useState<TimeEntry[]>(MOCK_ENTRIES);

  // CALCULATE: Summary statistics
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
  const billableHours = entries.filter((e) => e.billable).reduce((sum, entry) => sum + entry.hours, 0);
  const approvedHours = entries.filter((e) => e.status === 'approved').reduce((sum, entry) => sum + entry.hours, 0);
  const uniqueProjects = [...new Set(entries.map((e) => e.project))].length;

  // HELPER: Get status color
  const getStatusColor = (status: TimeEntry['status']) => {
    const colors = {
      approved: 'success',
      pending: 'warning',
      rejected: 'error',
    };
    return colors[status] as 'success' | 'warning' | 'error';
  };

  // HELPER: Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
    });
  };

  // GROUP: Entries by date for weekly view
  const entriesByDate = entries.reduce<Record<string, TimeEntry[]>>((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(entriesByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  // RENDER: Summary Card
  const renderSummaryCard = (
    title: string,
    value: string | number,
    icon: string,
    color: string,
    subtitle?: string
  ) => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${color}15, ${color}25)`,
        border: `1px solid ${color}30`,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${color}20`,
            }}
          >
            <Iconify icon={icon as any} width={28} sx={{ color }} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.disabled">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <DashboardContent maxWidth="xl">
      {/* HEADER SECTION */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
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
            Timesheet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track and manage your work hours
          </Typography>
        </Box>

        {/* ACTION BUTTONS */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon={'solar:calendar-bold' as any} />}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
            }}
          >
            This Week
          </Button>
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
            Log Time
          </Button>
        </Box>
      </Box>

      {/* SUMMARY STATISTICS */}
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          mb: 3,
        }}
      >
        {renderSummaryCard(
          'Total Hours',
          totalHours,
          'solar:clock-circle-bold',
          '#2a5298',
          'This week'
        )}
        {renderSummaryCard(
          'Billable Hours',
          billableHours,
          'solar:dollar-circle-bold',
          '#10B981',
          `${Math.round((billableHours / totalHours) * 100)}% of total`
        )}
        {renderSummaryCard(
          'Approved Hours',
          approvedHours,
          'solar:check-circle-bold',
          '#F59E0B',
          `${entries.filter((e) => e.status === 'approved').length} entries`
        )}
        {renderSummaryCard(
          'Active Projects',
          uniqueProjects,
          'solar:folder-with-files-bold',
          '#6366F1',
          'Projects worked on'
        )}
      </Box>

      {/* WEEKLY VIEW SECTION */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Time Entries
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small">
                <Iconify icon={'solar:alt-arrow-left-bold' as any} width={20} />
              </IconButton>
              <Typography variant="body2" sx={{ px: 2, py: 0.5, alignSelf: 'center' }}>
                Nov 10 - Nov 14, 2024
              </Typography>
              <IconButton size="small">
                <Iconify icon={'solar:alt-arrow-right-bold' as any} width={20} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Project</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Task</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Hours
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Billable
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDates.map((date) =>
                entriesByDate[date].map((entry, index) => (
                  <TableRow
                    key={entry.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    {/* DATE */}
                    {index === 0 && (
                      <TableCell
                        rowSpan={entriesByDate[date].length}
                        sx={{
                          borderRight: 1,
                          borderColor: 'divider',
                          verticalAlign: 'top',
                          pt: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {formatDate(date)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {entriesByDate[date].reduce((sum, e) => sum + e.hours, 0)}h total
                          </Typography>
                        </Box>
                      </TableCell>
                    )}

                    {/* PROJECT */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {entry.project}
                      </Typography>
                    </TableCell>

                    {/* TASK */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {entry.task}
                      </Typography>
                    </TableCell>

                    {/* DESCRIPTION */}
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {entry.description}
                      </Typography>
                    </TableCell>

                    {/* HOURS */}
                    <TableCell align="center">
                      <Chip
                        label={`${entry.hours}h`}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                          color: 'white',
                        }}
                      />
                    </TableCell>

                    {/* BILLABLE */}
                    <TableCell align="center">
                      {entry.billable ? (
                        <Iconify
                          icon={'solar:check-circle-bold' as any}
                          width={24}
                          sx={{ color: 'success.main' }}
                        />
                      ) : (
                        <Iconify
                          icon={'solar:close-circle-bold' as any}
                          width={24}
                          sx={{ color: 'text.disabled' }}
                        />
                      )}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell align="center">
                      <Chip
                        label={entry.status.toUpperCase()}
                        color={getStatusColor(entry.status)}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <IconButton size="small" color="primary">
                          <Iconify icon={'solar:pen-bold' as any} width={18} />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Iconify icon={'solar:trash-bin-trash-bold' as any} width={18} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* QUICK ADD TIME ENTRY */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Quick Add Time Entry
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            <TextField label="Project" select defaultValue="" size="small" fullWidth />
            <TextField label="Task" size="small" fullWidth />
            <TextField label="Hours" type="number" defaultValue="0" size="small" fullWidth />
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1e3c72 20%, #2a5298 120%)',
                },
              }}
            >
              Add Entry
            </Button>
          </Box>
        </CardContent>
      </Card>
    </DashboardContent>
  );
}
