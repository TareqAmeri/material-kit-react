import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import AvatarGroup from '@mui/material/AvatarGroup';
import LinearProgress from '@mui/material/LinearProgress';
import InputAdornment from '@mui/material/InputAdornment';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * PROJECT DATA TYPE
 */
type Project = {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'on-hold' | 'completed' | 'planning';
  progress: number;
  dueDate: string;
  team: Array<{ name: string; avatar: string }>;
  tasksTotal: number;
  tasksCompleted: number;
  priority: 'high' | 'medium' | 'low';
};

/**
 * MOCK PROJECT DATA
 */
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform Redesign',
    description: 'Complete overhaul of the online shopping experience with modern UI/UX patterns and mobile-first approach.',
    status: 'active',
    progress: 68,
    dueDate: '2024-12-15',
    team: [
      { name: 'Alice Johnson', avatar: '/assets/images/avatar/avatar-1.webp' },
      { name: 'Bob Smith', avatar: '/assets/images/avatar/avatar-2.webp' },
      { name: 'Carol White', avatar: '/assets/images/avatar/avatar-3.webp' },
    ],
    tasksTotal: 45,
    tasksCompleted: 31,
    priority: 'high',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native iOS and Android app for seamless customer engagement and real-time notifications.',
    status: 'active',
    progress: 45,
    dueDate: '2025-01-20',
    team: [
      { name: 'David Lee', avatar: '/assets/images/avatar/avatar-4.webp' },
      { name: 'Emma Davis', avatar: '/assets/images/avatar/avatar-5.webp' },
    ],
    tasksTotal: 38,
    tasksCompleted: 17,
    priority: 'high',
  },
  {
    id: '3',
    name: 'Marketing Campaign Q4',
    description: 'Multi-channel marketing strategy including social media, email campaigns, and influencer partnerships.',
    status: 'active',
    progress: 72,
    dueDate: '2024-11-30',
    team: [
      { name: 'Frank Miller', avatar: '/assets/images/avatar/avatar-6.webp' },
      { name: 'Grace Taylor', avatar: '/assets/images/avatar/avatar-7.webp' },
      { name: 'Henry Wilson', avatar: '/assets/images/avatar/avatar-8.webp' },
      { name: 'Iris Brown', avatar: '/assets/images/avatar/avatar-9.webp' },
    ],
    tasksTotal: 28,
    tasksCompleted: 20,
    priority: 'medium',
  },
  {
    id: '4',
    name: 'API Integration & Backend',
    description: 'RESTful API development with microservices architecture and comprehensive documentation.',
    status: 'on-hold',
    progress: 30,
    dueDate: '2025-02-10',
    team: [
      { name: 'Jack Anderson', avatar: '/assets/images/avatar/avatar-10.webp' },
      { name: 'Kate Martinez', avatar: '/assets/images/avatar/avatar-11.webp' },
    ],
    tasksTotal: 52,
    tasksCompleted: 16,
    priority: 'low',
  },
  {
    id: '5',
    name: 'Data Analytics Dashboard',
    description: 'Business intelligence platform with real-time analytics, custom reports, and data visualization.',
    status: 'planning',
    progress: 15,
    dueDate: '2025-03-01',
    team: [
      { name: 'Liam Garcia', avatar: '/assets/images/avatar/avatar-12.webp' },
    ],
    tasksTotal: 34,
    tasksCompleted: 5,
    priority: 'medium',
  },
  {
    id: '6',
    name: 'Security Audit & Compliance',
    description: 'Comprehensive security assessment, penetration testing, and GDPR compliance implementation.',
    status: 'completed',
    progress: 100,
    dueDate: '2024-10-15',
    team: [
      { name: 'Mia Rodriguez', avatar: '/assets/images/avatar/avatar-13.webp' },
      { name: 'Noah Lopez', avatar: '/assets/images/avatar/avatar-14.webp' },
    ],
    tasksTotal: 22,
    tasksCompleted: 22,
    priority: 'high',
  },
];

/**
 * PROJECTS VIEW COMPONENT
 * 
 * Comprehensive project management interface
 * Features:
 * - Grid view with project cards
 * - Search and filter functionality
 * - Status badges and progress indicators
 * - Team member avatars
 * - Priority indicators
 * - Dark Premium Theme styling
 */
export function ProjectsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // FILTER: Apply search and status filters
  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // HELPER: Get status color
  const getStatusColor = (status: Project['status']) => {
    const colors = {
      active: 'success',
      'on-hold': 'warning',
      completed: 'info',
      planning: 'secondary',
    };
    return colors[status] as 'success' | 'warning' | 'info' | 'secondary';
  };

  // HELPER: Get priority color
  const getPriorityColor = (priority: Project['priority']) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'info',
    };
    return colors[priority] as 'error' | 'warning' | 'info';
  };

  // RENDER: Project Card
  const renderProjectCard = (project: Project) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(42, 82, 152, 0.2)',
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* HEADER: Status and Priority */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Chip
              label={project.status.replace('-', ' ').toUpperCase()}
              color={getStatusColor(project.status)}
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label={project.priority.toUpperCase()}
              color={getPriorityColor(project.priority)}
              size="small"
              variant="outlined"
            />
          </Box>

          {/* PROJECT NAME */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {project.name}
          </Typography>

          {/* DESCRIPTION */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              minHeight: 60,
            }}
          >
            {project.description}
          </Typography>

          {/* PROGRESS BAR */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {project.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={project.progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                },
              }}
            />
          </Box>

          {/* TASKS COUNTER */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon={'solar:checklist-bold' as any} width={20} sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {project.tasksCompleted} / {project.tasksTotal} tasks completed
            </Typography>
          </Box>

          {/* DUE DATE */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon={'solar:calendar-bold' as any} width={20} sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Due: {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Typography>
          </Box>

          {/* TEAM AVATARS */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 2 }}>
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 14 } }}>
              {project.team.map((member, index) => (
                <Tooltip title={member.name} key={index}>
                  <Avatar alt={member.name} src={member.avatar} />
                </Tooltip>
              ))}
            </AvatarGroup>

            {/* ACTION BUTTONS */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="View Details">
                <IconButton size="small" color="primary">
                  <Iconify icon={'solar:eye-bold' as any} width={20} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Project">
                <IconButton size="small" color="primary">
                  <Iconify icon={'solar:pen-bold' as any} width={20} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
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
          mb: 4,
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
            Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track all your projects in one place
          </Typography>
        </Box>

        {/* NEW PROJECT BUTTON */}
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
      </Box>

      {/* SEARCH AND FILTER BAR */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          {/* SEARCH INPUT */}
          <TextField
            fullWidth
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={'solar:magnifer-bold' as any} width={24} sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* STATUS FILTER CHIPS */}
          <Stack direction="row" spacing={1} sx={{ minWidth: { sm: 'auto', xs: '100%' }, flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="All"
              color={statusFilter === 'all' ? 'primary' : 'default'}
              onClick={() => setStatusFilter('all')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Active"
              color={statusFilter === 'active' ? 'success' : 'default'}
              onClick={() => setStatusFilter('active')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="On Hold"
              color={statusFilter === 'on-hold' ? 'warning' : 'default'}
              onClick={() => setStatusFilter('on-hold')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Completed"
              color={statusFilter === 'completed' ? 'info' : 'default'}
              onClick={() => setStatusFilter('completed')}
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Card>

      {/* PROJECT STATS */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip
          icon={<Iconify icon={'solar:folder-with-files-bold' as any} width={18} />}
          label={`${filteredProjects.length} Projects`}
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<Iconify icon={'solar:check-circle-bold' as any} width={18} />}
          label={`${MOCK_PROJECTS.filter((p) => p.status === 'active').length} Active`}
          color="success"
          variant="outlined"
        />
        <Chip
          icon={<Iconify icon={'solar:clock-circle-bold' as any} width={18} />}
          label={`${MOCK_PROJECTS.filter((p) => p.status === 'on-hold').length} On Hold`}
          color="warning"
          variant="outlined"
        />
      </Box>

      {/* PROJECTS GRID */}
      {filteredProjects.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => renderProjectCard(project))}
        </Grid>
      ) : (
        <Card sx={{ p: 6, textAlign: 'center' }}>
          <Iconify
            icon={'solar:folder-with-files-bold' as any}
            width={64}
            sx={{ color: 'text.disabled', mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            No projects found
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
            Try adjusting your search or filter criteria
          </Typography>
        </Card>
      )}
    </DashboardContent>
  );
}
