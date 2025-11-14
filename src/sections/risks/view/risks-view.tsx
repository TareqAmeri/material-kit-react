import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

type Risk = { id: string; title: string; description: string; severity: 'low' | 'medium' | 'high' | 'critical'; status: string; project: string };

const RISKS: Risk[] = [
  { id: '1', title: 'API Rate Limiting', description: 'Third-party API may throttle requests', severity: 'high', status: 'Active', project: 'E-Commerce' },
  { id: '2', title: 'Browser Compatibility', description: 'Legacy browser support issues', severity: 'medium', status: 'Mitigating', project: 'Mobile App' },
  { id: '3', title: 'Data Security Breach', description: 'Potential vulnerability in auth system', severity: 'critical', status: 'Active', project: 'API Integration' },
  { id: '4', title: 'Budget Overrun', description: 'Project costs exceeding estimates', severity: 'medium', status: 'Monitoring', project: 'Marketing' },
];

export function RisksView() {
  const getColor = (severity: string) => ({ low: 'info', medium: 'warning', high: 'error', critical: 'error' }[severity] as any);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 3 }}>
        Risk Management
      </Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        {RISKS.map((risk) => (
          <Card key={risk.id}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, justifyContent: 'space-between' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip label={risk.severity.toUpperCase()} color={getColor(risk.severity)} size="small" />
                    <Chip label={risk.status} variant="outlined" size="small" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{risk.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{risk.description}</Typography>
                  <Chip label={risk.project} size="small" sx={{ fontSize: '0.7rem' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </DashboardContent>
  );
}
