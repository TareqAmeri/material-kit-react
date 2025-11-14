import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

type Issue = { id: string; title: string; type: 'bug' | 'feature' | 'improvement'; priority: 'low' | 'medium' | 'high'; status: string; assignee: { name: string; avatar: string } };

const ISSUES: Issue[] = [
  { id: '1', title: 'Login form validation not working', type: 'bug', priority: 'high', status: 'Open', assignee: { name: 'Alice', avatar: '/assets/images/avatar/avatar-1.webp' } },
  { id: '2', title: 'Add dark mode toggle', type: 'feature', priority: 'medium', status: 'In Progress', assignee: { name: 'Bob', avatar: '/assets/images/avatar/avatar-2.webp' } },
  { id: '3', title: 'Optimize image loading', type: 'improvement', priority: 'low', status: 'Open', assignee: { name: 'Carol', avatar: '/assets/images/avatar/avatar-3.webp' } },
  { id: '4', title: 'Fix memory leak in dashboard', type: 'bug', priority: 'high', status: 'In Progress', assignee: { name: 'David', avatar: '/assets/images/avatar/avatar-4.webp' } },
];

export function IssuesView() {
  const getTypeColor = (type: string) => ({ bug: 'error', feature: 'success', improvement: 'info' }[type] as any);
  const getPriorityColor = (priority: string) => ({ low: 'info', medium: 'warning', high: 'error' }[priority] as any);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 3 }}>
        Issues & Bugs
      </Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        {ISSUES.map((issue) => (
          <Card key={issue.id}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                    <Iconify icon={'solar:bug-bold' as any} width={20} sx={{ color: getTypeColor(issue.type) === 'error' ? 'error.main' : 'text.secondary' }} />
                    <Chip label={issue.type.toUpperCase()} color={getTypeColor(issue.type)} size="small" />
                    <Chip label={issue.priority.toUpperCase()} color={getPriorityColor(issue.priority)} size="small" variant="outlined" />
                    <Chip label={issue.status} size="small" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{issue.title}</Typography>
                </Box>
                <Avatar src={issue.assignee.avatar} sx={{ width: 40, height: 40 }} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </DashboardContent>
  );
}
