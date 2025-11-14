import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'developer' | 'designer';
  department: string;
  status: 'active' | 'away' | 'offline';
  projects: number;
  tasksCompleted: number;
  joinDate: string;
};

const MOCK_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@projecthub.com',
    avatar: '/assets/images/avatar/avatar-1.webp',
    role: 'admin',
    department: 'Engineering',
    status: 'active',
    projects: 5,
    tasksCompleted: 127,
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@projecthub.com',
    avatar: '/assets/images/avatar/avatar-2.webp',
    role: 'developer',
    department: 'Engineering',
    status: 'active',
    projects: 3,
    tasksCompleted: 89,
    joinDate: '2023-03-20',
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol.white@projecthub.com',
    avatar: '/assets/images/avatar/avatar-3.webp',
    role: 'designer',
    department: 'Design',
    status: 'away',
    projects: 4,
    tasksCompleted: 65,
    joinDate: '2023-02-10',
  },
  {
    id: '4',
    name: 'David Lee',
    email: 'david.lee@projecthub.com',
    avatar: '/assets/images/avatar/avatar-4.webp',
    role: 'developer',
    department: 'Engineering',
    status: 'active',
    projects: 4,
    tasksCompleted: 102,
    joinDate: '2023-04-05',
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma.davis@projecthub.com',
    avatar: '/assets/images/avatar/avatar-5.webp',
    role: 'manager',
    department: 'Product',
    status: 'active',
    projects: 6,
    tasksCompleted: 95,
    joinDate: '2022-11-12',
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.miller@projecthub.com',
    avatar: '/assets/images/avatar/avatar-6.webp',
    role: 'developer',
    department: 'Engineering',
    status: 'offline',
    projects: 2,
    tasksCompleted: 56,
    joinDate: '2023-06-18',
  },
  {
    id: '7',
    name: 'Grace Taylor',
    email: 'grace.taylor@projecthub.com',
    avatar: '/assets/images/avatar/avatar-7.webp',
    role: 'designer',
    department: 'Design',
    status: 'active',
    projects: 3,
    tasksCompleted: 78,
    joinDate: '2023-05-22',
  },
  {
    id: '8',
    name: 'Henry Wilson',
    email: 'henry.wilson@projecthub.com',
    avatar: '/assets/images/avatar/avatar-8.webp',
    role: 'manager',
    department: 'Marketing',
    status: 'away',
    projects: 5,
    tasksCompleted: 112,
    joinDate: '2022-09-30',
  },
];

export function TeamView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredMembers = MOCK_MEMBERS.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: TeamMember['role']) => {
    const colors = { admin: 'error', manager: 'warning', developer: 'primary', designer: 'secondary' };
    return colors[role] as 'error' | 'warning' | 'primary' | 'secondary';
  };

  const getStatusColor = (status: TeamMember['status']) => {
    const colors = { active: '#10B981', away: '#F59E0B', offline: '#6B7280' };
    return colors[status];
  };

  const renderMemberCard = (member: TeamMember) => (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={member.id}>
      <Card
        sx={{
          height: '100%',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(42, 82, 152, 0.2)',
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
            <Avatar
              alt={member.name}
              src={member.avatar}
              sx={{ width: 80, height: 80, border: 3, borderColor: 'background.paper' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: getStatusColor(member.status),
                border: 2,
                borderColor: 'background.paper',
              }}
            />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            {member.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {member.email}
          </Typography>

          <Chip label={member.role.toUpperCase()} color={getRoleColor(member.role)} size="small" sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {member.projects}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Projects
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {member.tasksCompleted}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tasks
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" color="primary">
              <Iconify icon={'solar:chat-round-dots-bold' as any} width={20} />
            </IconButton>
            <IconButton size="small" color="primary">
              <Iconify icon={'solar:letter-bold' as any} width={20} />
            </IconButton>
            <IconButton size="small" color="primary">
              <Iconify icon={'solar:phone-bold' as any} width={20} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
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
            Team Members
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your team and collaborate effectively
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Iconify icon={'solar:user-plus-bold' as any} />}
          sx={{
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            boxShadow: '0 4px 12px rgba(42, 82, 152, 0.3)',
            '&:hover': { background: 'linear-gradient(135deg, #1e3c72 20%, #2a5298 120%)' },
          }}
        >
          Add Member
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, mb: 3 }}>
        <Card sx={{ background: 'linear-gradient(135deg, #2a529815, #2a529825)' }}>
          <CardContent sx={{ textAlign: 'center', p: 2 }}>
            <Iconify icon={'solar:users-group-rounded-bold' as any} width={32} sx={{ color: '#2a5298', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#2a5298' }}>
              {MOCK_MEMBERS.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Members
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ background: 'linear-gradient(135deg, #10B98115, #10B98125)' }}>
          <CardContent sx={{ textAlign: 'center', p: 2 }}>
            <Iconify icon={'solar:check-circle-bold' as any} width={32} sx={{ color: '#10B981', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#10B981' }}>
              {MOCK_MEMBERS.filter((m) => m.status === 'active').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Now
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ background: 'linear-gradient(135deg, #6366F115, #6366F125)' }}>
          <CardContent sx={{ textAlign: 'center', p: 2 }}>
            <Iconify icon={'solar:case-round-bold' as any} width={32} sx={{ color: '#6366F1', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#6366F1' }}>
              4
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Departments
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ background: 'linear-gradient(135deg, #F59E0B15, #F59E0B25)' }}>
          <CardContent sx={{ textAlign: 'center', p: 2 }}>
            <Iconify icon={'solar:chart-2-bold' as any} width={32} sx={{ color: '#F59E0B', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#F59E0B' }}>
              724
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Tasks
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="Search members..."
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
            sx={{ maxWidth: { sm: 400 } }}
          />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="All" color={roleFilter === 'all' ? 'primary' : 'default'} onClick={() => setRoleFilter('all')} sx={{ cursor: 'pointer' }} />
            <Chip label="Admin" color={roleFilter === 'admin' ? 'error' : 'default'} onClick={() => setRoleFilter('admin')} sx={{ cursor: 'pointer' }} />
            <Chip label="Manager" color={roleFilter === 'manager' ? 'warning' : 'default'} onClick={() => setRoleFilter('manager')} sx={{ cursor: 'pointer' }} />
            <Chip label="Developer" color={roleFilter === 'developer' ? 'primary' : 'default'} onClick={() => setRoleFilter('developer')} sx={{ cursor: 'pointer' }} />
            <Chip label="Designer" color={roleFilter === 'designer' ? 'secondary' : 'default'} onClick={() => setRoleFilter('designer')} sx={{ cursor: 'pointer' }} />
          </Box>
        </Box>
      </Card>

      <Grid container spacing={3}>
        {filteredMembers.map((member) => renderMemberCard(member))}
      </Grid>
    </DashboardContent>
  );
}
