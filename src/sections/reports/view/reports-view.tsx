import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

const REPORTS = [
  { id: '1', title: 'Project Status Report', type: 'Weekly', date: '2024-11-14', icon: 'solar:chart-2-bold', color: '#2a5298' },
  { id: '2', title: 'Team Performance', type: 'Monthly', date: '2024-11-01', icon: 'solar:users-group-rounded-bold', color: '#10B981' },
  { id: '3', title: 'Budget Analysis', type: 'Quarterly', date: '2024-10-01', icon: 'solar:dollar-circle-bold', color: '#F59E0B' },
  { id: '4', title: 'Time Tracking Summary', type: 'Weekly', date: '2024-11-14', icon: 'solar:clock-circle-bold', color: '#EF4444' },
];

export function ReportsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 3 }}>
        Reports & Analytics
      </Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
        {REPORTS.map((report) => (
          <Card key={report.id} sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
            <CardContent>
              <Box sx={{ width: 56, height: 56, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: `${report.color}15`, mb: 2 }}>
                <Iconify icon={report.icon as any} width={32} sx={{ color: report.color }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{report.title}</Typography>
              <Typography variant="body2" color="text.secondary">{report.type} • {report.date}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </DashboardContent>
  );
}
