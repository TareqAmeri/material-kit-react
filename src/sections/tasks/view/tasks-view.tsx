import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * TASK DATA TYPE
 */
type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  tags: string[];
  comments: number;
  attachments: number;
};

/**
 * MOCK TASKS DATA
 */
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create mockups and prototypes for the new marketing landing page',
    status: 'in-progress',
    priority: 'high',
    assignee: {
      name: 'Alice Johnson',
      avatar: '/assets/images/avatar/avatar-1.webp',
    },
    dueDate: '2024-11-20',
    tags: ['Design', 'UI/UX'],
    comments: 5,
    attachments: 3,
  },
  {
    id: '2',
    title: 'Implement authentication system',
    description: 'Set up JWT authentication with refresh tokens and secure password hashing',
    status: 'in-progress',
    priority: 'high',
    assignee: {
      name: 'Bob Smith',
      avatar: '/assets/images/avatar/avatar-2.webp',
    },
    dueDate: '2024-11-18',
    tags: ['Backend', 'Security'],
    comments: 8,
    attachments: 1,
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints with examples and response schemas',
    status: 'todo',
    priority: 'medium',
    assignee: {
      name: 'Carol White',
      avatar: '/assets/images/avatar/avatar-3.webp',
    },
    dueDate: '2024-11-25',
    tags: ['Documentation'],
    comments: 2,
    attachments: 0,
  },
  {
    id: '4',
    title: 'Fix responsive layout issues',
    description: 'Address mobile layout problems on product detail pages',
    status: 'review',
    priority: 'high',
    assignee: {
      name: 'David Lee',
      avatar: '/assets/images/avatar/avatar-4.webp',
    },
    dueDate: '2024-11-16',
    tags: ['Frontend', 'Bug'],
    comments: 12,
    attachments: 5,
  },
  {
    id: '5',
    title: 'Update dependencies',
    description: 'Upgrade all npm packages to latest stable versions',
    status: 'todo',
    priority: 'low',
    assignee: {
      name: 'Emma Davis',
      avatar: '/assets/images/avatar/avatar-5.webp',
    },
    dueDate: '2024-12-01',
    tags: ['Maintenance'],
    comments: 1,
    attachments: 0,
  },
  {
    id: '6',
    title: 'Conduct user testing',
    description: 'Run usability tests with 10 participants and collect feedback',
    status: 'todo',
    priority: 'medium',
    assignee: {
      name: 'Frank Miller',
      avatar: '/assets/images/avatar/avatar-6.webp',
    },
    dueDate: '2024-11-22',
    tags: ['Research', 'UX'],
    comments: 3,
    attachments: 2,
  },
  {
    id: '7',
    title: 'Optimize database queries',
    description: 'Improve query performance and add proper indexes',
    status: 'review',
    priority: 'medium',
    assignee: {
      name: 'Grace Taylor',
      avatar: '/assets/images/avatar/avatar-7.webp',
    },
    dueDate: '2024-11-19',
    tags: ['Backend', 'Performance'],
    comments: 6,
    attachments: 1,
  },
  {
    id: '8',
    title: 'Launch marketing campaign',
    description: 'Deploy Q4 marketing campaign across all channels',
    status: 'done',
    priority: 'high',
    assignee: {
      name: 'Henry Wilson',
      avatar: '/assets/images/avatar/avatar-8.webp',
    },
    dueDate: '2024-11-10',
    tags: ['Marketing'],
    comments: 15,
    attachments: 8,
  },
  {
    id: '9',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment workflows',
    status: 'done',
    priority: 'medium',
    assignee: {
      name: 'Iris Brown',
      avatar: '/assets/images/avatar/avatar-9.webp',
    },
    dueDate: '2024-11-08',
    tags: ['DevOps'],
    comments: 4,
    attachments: 2,
  },
  {
    id: '10',
    title: 'Create onboarding tutorial',
    description: 'Design interactive tutorial for new users',
    status: 'in-progress',
    priority: 'low',
    assignee: {
      name: 'Jack Anderson',
      avatar: '/assets/images/avatar/avatar-10.webp',
    },
    dueDate: '2024-11-28',
    tags: ['Documentation', 'UX'],
    comments: 7,
    attachments: 4,
  },
];

/**
 * KANBAN COLUMN CONFIGURATION
 */
const COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#6B7280' },
  { id: 'in-progress', title: 'In Progress', color: '#2a5298' },
  { id: 'review', title: 'Review', color: '#F59E0B' },
  { id: 'done', title: 'Done', color: '#10B981' },
] as const;

/**
 * TASKS VIEW COMPONENT
 * 
 * Kanban board for task management
 * Features:
 * - 4 columns (To Do, In Progress, Review, Done)
 * - Task cards with priority, assignee, due date
 * - Search and filter functionality
 * - Click to move tasks between columns
 * - Tag badges and metadata
 * - Dark Premium Theme styling
 */
export function TasksView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // FILTER: Apply search and priority filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // HELPER: Get priority color
  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'info',
    };
    return colors[priority] as 'error' | 'warning' | 'info';
  };

  // HANDLER: Move task to different status
  const handleMoveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  // RENDER: Task Card
  const renderTaskCard = (task: Task) => (
    <Card
      key={task.id}
      sx={{
        mb: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px rgba(42, 82, 152, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* PRIORITY CHIP */}
        <Chip
          label={task.priority.toUpperCase()}
          color={getPriorityColor(task.priority)}
          size="small"
          sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.7rem' }}
        />

        {/* TASK TITLE */}
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {task.title}
        </Typography>

        {/* TASK DESCRIPTION */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1.5,
            lineHeight: 1.4,
          }}
        >
          {task.description}
        </Typography>

        {/* TAGS */}
        {task.tags.length > 0 && (
          <Stack direction="row" spacing={0.5} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
            {task.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.65rem', height: 20 }}
              />
            ))}
          </Stack>
        )}

        <Divider sx={{ my: 1.5 }} />

        {/* FOOTER: Assignee, Due Date, Metadata */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* ASSIGNEE */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              alt={task.assignee.name}
              src={task.assignee.avatar}
              sx={{ width: 28, height: 28 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              {task.assignee.name.split(' ')[0]}
            </Typography>
          </Box>

          {/* METADATA */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* COMMENTS */}
            {task.comments > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <Iconify
                  icon={'solar:chat-round-dots-bold' as any}
                  width={14}
                  sx={{ color: 'text.secondary' }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  {task.comments}
                </Typography>
              </Box>
            )}

            {/* ATTACHMENTS */}
            {task.attachments > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <Iconify
                  icon={'solar:paperclip-bold' as any}
                  width={14}
                  sx={{ color: 'text.secondary' }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  {task.attachments}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        {/* DUE DATE */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
          <Iconify
            icon={'solar:calendar-bold' as any}
            width={14}
            sx={{ color: 'text.secondary' }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
            {new Date(task.dueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        </Box>

        {/* MOVE BUTTONS - Show on hover */}
        {task.status !== 'done' && (
          <Box sx={{ mt: 1.5, display: 'flex', gap: 0.5 }}>
            {task.status === 'todo' && (
              <Button
                size="small"
                variant="outlined"
                fullWidth
                onClick={() => handleMoveTask(task.id, 'in-progress')}
                sx={{ fontSize: '0.7rem', py: 0.5 }}
              >
                Start
              </Button>
            )}
            {task.status === 'in-progress' && (
              <Button
                size="small"
                variant="outlined"
                fullWidth
                onClick={() => handleMoveTask(task.id, 'review')}
                sx={{ fontSize: '0.7rem', py: 0.5 }}
              >
                Review
              </Button>
            )}
            {task.status === 'review' && (
              <Button
                size="small"
                variant="outlined"
                fullWidth
                onClick={() => handleMoveTask(task.id, 'done')}
                sx={{ fontSize: '0.7rem', py: 0.5 }}
              >
                Complete
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );

  // RENDER: Kanban Column
  const renderColumn = (column: (typeof COLUMNS)[number]) => {
    const columnTasks = filteredTasks.filter((task) => task.status === column.id);

    return (
      <Box
        key={column.id}
        sx={{
          minWidth: 300,
          width: { xs: '100%', sm: 300 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* COLUMN HEADER */}
        <Box
          sx={{
            p: 2,
            borderRadius: 1.5,
            background: `linear-gradient(135deg, ${column.color}15, ${column.color}25)`,
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {column.title}
            </Typography>
            <Chip
              label={columnTasks.length}
              size="small"
              sx={{
                backgroundColor: column.color,
                color: 'white',
                fontWeight: 700,
                minWidth: 28,
              }}
            />
          </Box>
        </Box>

        {/* COLUMN TASKS */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            pr: 1,
            minHeight: 400,
            maxHeight: 'calc(100vh - 350px)',
          }}
        >
          {columnTasks.length > 0 ? (
            columnTasks.map((task) => renderTaskCard(task))
          ) : (
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: 'action.hover',
                border: '2px dashed',
                borderColor: 'divider',
              }}
            >
              <Iconify
                icon={'solar:inbox-bold' as any}
                width={40}
                sx={{ color: 'text.disabled', mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                No tasks
              </Typography>
            </Card>
          )}
        </Box>
      </Box>
    );
  };

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
            Tasks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your tasks with Kanban board
          </Typography>
        </Box>

        {/* NEW TASK BUTTON */}
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
          New Task
        </Button>
      </Box>

      {/* SEARCH AND FILTER BAR */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          {/* SEARCH INPUT */}
          <TextField
            fullWidth
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon={'solar:magnifer-bold' as any}
                      width={24}
                      sx={{ color: 'text.secondary' }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* PRIORITY FILTER CHIPS */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ minWidth: { sm: 'auto', xs: '100%' }, flexWrap: 'wrap', gap: 1 }}
          >
            <Chip
              label="All"
              color={priorityFilter === 'all' ? 'primary' : 'default'}
              onClick={() => setPriorityFilter('all')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="High"
              color={priorityFilter === 'high' ? 'error' : 'default'}
              onClick={() => setPriorityFilter('high')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Medium"
              color={priorityFilter === 'medium' ? 'warning' : 'default'}
              onClick={() => setPriorityFilter('medium')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Low"
              color={priorityFilter === 'low' ? 'info' : 'default'}
              onClick={() => setPriorityFilter('low')}
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Card>

      {/* TASK STATISTICS */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip
          icon={<Iconify icon={'solar:checklist-bold' as any} width={18} />}
          label={`${filteredTasks.length} Total Tasks`}
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<Iconify icon={'solar:clock-circle-bold' as any} width={18} />}
          label={`${tasks.filter((t) => t.status === 'in-progress').length} In Progress`}
          color="secondary"
          variant="outlined"
        />
        <Chip
          icon={<Iconify icon={'solar:check-circle-bold' as any} width={18} />}
          label={`${tasks.filter((t) => t.status === 'done').length} Completed`}
          color="success"
          variant="outlined"
        />
      </Box>

      {/* KANBAN BOARD */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'action.hover',
            borderRadius: 4,
          },
        }}
      >
        {COLUMNS.map((column) => renderColumn(column))}
      </Box>
    </DashboardContent>
  );
}
