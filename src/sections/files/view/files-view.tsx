import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

type File = { id: string; name: string; type: string; size: string; date: string; project: string };

const MOCK_FILES: File[] = [
  { id: '1', name: 'Project Requirements.pdf', type: 'pdf', size: '2.4 MB', date: '2024-11-10', project: 'E-Commerce Platform' },
  { id: '2', name: 'Design Mockups.fig', type: 'figma', size: '15.8 MB', date: '2024-11-12', project: 'Mobile App' },
  { id: '3', name: 'API Documentation.docx', type: 'doc', size: '1.2 MB', date: '2024-11-08', project: 'API Integration' },
  { id: '4', name: 'User Research Data.xlsx', type: 'excel', size: '3.5 MB', date: '2024-11-14', project: 'Marketing Campaign' },
  { id: '5', name: 'Team Photo.jpg', type: 'image', size: '4.2 MB', date: '2024-11-01', project: 'General' },
  { id: '6', name: 'Sprint Presentation.pptx', type: 'ppt', size: '8.9 MB', date: '2024-11-13', project: 'E-Commerce Platform' },
];

export function FilesView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getFileIcon = (type: string) => {
    const icons: Record<string, string> = {
      pdf: 'vscode-icons:file-type-pdf2',
      doc: 'vscode-icons:file-type-word',
      excel: 'vscode-icons:file-type-excel',
      ppt: 'vscode-icons:file-type-powerpoint',
      image: 'vscode-icons:file-type-image',
      figma: 'vscode-icons:file-type-figma',
    };
    return icons[type] || 'solar:file-bold';
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Files & Documents
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => setViewMode('grid')} color={viewMode === 'grid' ? 'primary' : 'default'}>
            <Iconify icon={'solar:gallery-minimalistic-bold' as any} width={24} />
          </IconButton>
          <IconButton onClick={() => setViewMode('list')} color={viewMode === 'list' ? 'primary' : 'default'}>
            <Iconify icon={'solar:list-bold' as any} width={24} />
          </IconButton>
          <Button variant="contained" startIcon={<Iconify icon={'solar:upload-bold' as any} />} sx={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
            Upload
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: viewMode === 'grid' ? { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } : '1fr' }}>
        {MOCK_FILES.map((file) => (
          <Card key={file.id} sx={{ '&:hover': { boxShadow: 4 } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Iconify icon={getFileIcon(file.type) as any} width={48} />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {file.size} • {file.date}
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip label={file.project} size="small" sx={{ fontSize: '0.7rem' }} />
                  </Box>
                </Box>
                <Box>
                  <IconButton size="small">
                    <Iconify icon={'solar:download-bold' as any} width={20} />
                  </IconButton>
                  <IconButton size="small">
                    <Iconify icon={'solar:menu-dots-bold' as any} width={20} />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </DashboardContent>
  );
}
