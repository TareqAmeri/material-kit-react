import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

export function SettingsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 3 }}>
        Settings
      </Typography>

      <Box sx={{ display: 'grid', gap: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Profile Settings</Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField label="Full Name" defaultValue="John Doe" fullWidth />
              <TextField label="Email" defaultValue="john.doe@projecthub.com" fullWidth />
              <TextField label="Phone" defaultValue="+1 234 567 8900" fullWidth />
              <Button variant="contained" sx={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', alignSelf: 'flex-start' }}>
                Save Changes
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Notifications</Typography>
            {['Email Notifications', 'Push Notifications', 'Task Reminders', 'Weekly Reports'].map((label) => (
              <Box key={label}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon={'solar:bell-bold' as any} width={20} sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">{label}</Typography>
                  </Box>
                  <Switch defaultChecked />
                </Box>
                <Divider />
              </Box>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Security</Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField label="Current Password" type="password" fullWidth />
              <TextField label="New Password" type="password" fullWidth />
              <TextField label="Confirm Password" type="password" fullWidth />
              <Button variant="contained" color="error" sx={{ alignSelf: 'flex-start' }}>
                Update Password
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </DashboardContent>
  );
}
