import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

type Message = { id: string; sender: string; text: string; time: string; isOwn: boolean };
type Chat = { id: string; name: string; avatar: string; lastMessage: string; time: string; unread: number };

const MOCK_CHATS: Chat[] = [
  { id: '1', name: 'Alice Johnson', avatar: '/assets/images/avatar/avatar-1.webp', lastMessage: 'Great work on the project!', time: '2m ago', unread: 2 },
  { id: '2', name: 'Bob Smith', avatar: '/assets/images/avatar/avatar-2.webp', lastMessage: 'Can you review my PR?', time: '15m ago', unread: 0 },
  { id: '3', name: 'Carol White', avatar: '/assets/images/avatar/avatar-3.webp', lastMessage: 'Meeting at 3 PM', time: '1h ago', unread: 1 },
];

const MOCK_MESSAGES: Message[] = [
  { id: '1', sender: 'Alice Johnson', text: 'Hey! How is the project going?', time: '10:30 AM', isOwn: false },
  { id: '2', sender: 'You', text: 'Going well! Just finished the dashboard.', time: '10:32 AM', isOwn: true },
  { id: '3', sender: 'Alice Johnson', text: 'Great work on the project!', time: '10:35 AM', isOwn: false },
];

export function ChatView() {
  const [selectedChat] = useState(MOCK_CHATS[0]);
  const [message, setMessage] = useState('');

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 3 }}>
        Team Chat
      </Typography>

      <Card sx={{ display: 'flex', height: 600 }}>
        <Box sx={{ width: 320, borderRight: 1, borderColor: 'divider', overflow: 'auto' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <TextField fullWidth placeholder="Search conversations..." size="small" />
          </Box>
          <List sx={{ p: 0 }}>
            {MOCK_CHATS.map((chat) => (
              <ListItemButton key={chat.id} selected={selectedChat.id === chat.id}>
                <ListItemAvatar>
                  <Avatar src={chat.avatar} />
                </ListItemAvatar>
                <ListItemText primary={chat.name} secondary={chat.lastMessage} />
                {chat.unread > 0 && (
                  <Box sx={{ bgcolor: 'error.main', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                    {chat.unread}
                  </Box>
                )}
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={selectedChat.avatar} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{selectedChat.name}</Typography>
              <Typography variant="caption" color="text.secondary">Active now</Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto', bgcolor: 'action.hover' }}>
            {MOCK_MESSAGES.map((msg) => (
              <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.isOwn ? 'flex-end' : 'flex-start', mb: 2 }}>
                <Box sx={{ maxWidth: '70%', bgcolor: msg.isOwn ? 'primary.main' : 'background.paper', color: msg.isOwn ? 'white' : 'text.primary', p: 1.5, borderRadius: 2, boxShadow: 1 }}>
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5, display: 'block' }}>{msg.time}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', gap: 1 }}>
            <TextField fullWidth placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} size="small" />
            <IconButton color="primary" sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
              <Iconify icon={'solar:plain-2-bold' as any} width={24} />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </DashboardContent>
  );
}
