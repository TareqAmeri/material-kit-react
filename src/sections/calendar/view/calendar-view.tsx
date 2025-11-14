import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * EVENT DATA TYPE
 */
type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  category: 'meeting' | 'deadline' | 'event' | 'reminder';
  project?: string;
  attendees?: string[];
  location?: string;
};

/**
 * MOCK CALENDAR EVENTS
 */
const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Sprint Planning Meeting',
    description: 'Plan tasks and priorities for the upcoming sprint',
    date: '2024-11-18',
    startTime: '09:00',
    endTime: '10:30',
    category: 'meeting',
    project: 'E-Commerce Platform',
    attendees: ['Alice', 'Bob', 'Carol'],
    location: 'Conference Room A',
  },
  {
    id: '2',
    title: 'Project Deadline',
    description: 'Final delivery for mobile app redesign',
    date: '2024-11-20',
    startTime: '17:00',
    endTime: '17:00',
    category: 'deadline',
    project: 'Mobile App',
  },
  {
    id: '3',
    title: 'Client Presentation',
    description: 'Demo new features to stakeholders',
    date: '2024-11-22',
    startTime: '14:00',
    endTime: '15:30',
    category: 'meeting',
    project: 'E-Commerce Platform',
    attendees: ['Client Team', 'Development Team'],
    location: 'Virtual - Zoom',
  },
  {
    id: '4',
    title: 'Team Lunch',
    description: 'Monthly team building lunch',
    date: '2024-11-15',
    startTime: '12:00',
    endTime: '13:30',
    category: 'event',
  },
  {
    id: '5',
    title: 'Code Review Session',
    description: 'Review pull requests and discuss best practices',
    date: '2024-11-19',
    startTime: '15:00',
    endTime: '16:00',
    category: 'meeting',
    project: 'API Integration',
  },
  {
    id: '6',
    title: 'Submit Timesheet',
    description: 'Weekly timesheet submission deadline',
    date: '2024-11-17',
    startTime: '23:59',
    endTime: '23:59',
    category: 'reminder',
  },
  {
    id: '7',
    title: 'Design Workshop',
    description: 'UX/UI design brainstorming session',
    date: '2024-11-21',
    startTime: '10:00',
    endTime: '12:00',
    category: 'meeting',
    project: 'Mobile App',
    attendees: ['Design Team'],
  },
  {
    id: '8',
    title: 'Security Audit Complete',
    description: 'Final security assessment report due',
    date: '2024-11-25',
    startTime: '17:00',
    endTime: '17:00',
    category: 'deadline',
    project: 'Security Audit',
  },
];

/**
 * CALENDAR VIEW COMPONENT
 * 
 * Event scheduling and management interface
 * Features:
 * - Monthly calendar grid
 * - Event cards with time and details
 * - Category filtering
 * - Upcoming events sidebar
 * - Month navigation
 * - Dark Premium Theme styling
 */
export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1)); // November 2024
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // HELPER: Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // HELPER: Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // FILTER: Events by category
  const filteredEvents = selectedCategory === 'all' 
    ? MOCK_EVENTS 
    : MOCK_EVENTS.filter((event) => event.category === selectedCategory);

  // HELPER: Get events for a specific date
  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter((event) => event.date === dateStr);
  };

  // HELPER: Get category color
  const getCategoryColor = (category: CalendarEvent['category']) => {
    const colors = {
      meeting: '#2a5298',
      deadline: '#EF4444',
      event: '#10B981',
      reminder: '#F59E0B',
    };
    return colors[category];
  };

  // HELPER: Get category icon
  const getCategoryIcon = (category: CalendarEvent['category']) => {
    const icons = {
      meeting: 'solar:users-group-rounded-bold',
      deadline: 'solar:flag-bold',
      event: 'solar:calendar-mark-bold',
      reminder: 'solar:bell-bold',
    };
    return icons[category];
  };

  // HANDLER: Navigate months
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2024, 10, 14)); // Set to Nov 14, 2024
  };

  // RENDER: Calendar day cell
  const renderDayCell = (day: number, isCurrentMonth: boolean) => {
    const events = getEventsForDate(day);
    const isToday = day === 14; // Nov 14 is "today"

    return (
      <Box
        sx={{
          minHeight: 120,
          border: 1,
          borderColor: 'divider',
          p: 1,
          backgroundColor: isCurrentMonth ? 'background.paper' : 'action.hover',
          position: 'relative',
          '&:hover': {
            backgroundColor: isCurrentMonth ? 'action.hover' : 'action.selected',
          },
        }}
      >
        {/* DAY NUMBER */}
        <Badge
          badgeContent={events.length || null}
          color="primary"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.65rem',
              minWidth: 16,
              height: 16,
              padding: '0 4px',
            },
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: isToday ? 'primary.main' : 'transparent',
              color: isToday ? 'white' : isCurrentMonth ? 'text.primary' : 'text.disabled',
              fontWeight: isToday ? 700 : 600,
            }}
          >
            {day}
          </Box>
        </Badge>

        {/* EVENT INDICATORS */}
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {events.slice(0, 2).map((event) => (
            <Box
              key={event.id}
              sx={{
                px: 0.75,
                py: 0.5,
                borderRadius: 0.5,
                backgroundColor: `${getCategoryColor(event.category)}15`,
                borderLeft: 3,
                borderColor: getCategoryColor(event.category),
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: `${getCategoryColor(event.category)}25`,
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                {event.startTime} {event.title}
              </Typography>
            </Box>
          ))}
          {events.length > 2 && (
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', pl: 0.75 }}>
              +{events.length - 2} more
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  // RENDER: Calendar grid
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month days
    const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    for (let i = firstDay - 1; i >= 0; i -= 1) {
      days.push(
        <Box key={`prev-${i}`}>
          {renderDayCell(prevMonthDays - i, false)}
        </Box>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day += 1) {
      days.push(
        <Box key={`current-${day}`}>
          {renderDayCell(day, true)}
        </Box>
      );
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day += 1) {
      days.push(
        <Box key={`next-${day}`}>
          {renderDayCell(day, false)}
        </Box>
      );
    }

    return days;
  };

  // RENDER: Upcoming events
  const upcomingEvents = filteredEvents
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

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
            Calendar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your schedule and events
          </Typography>
        </Box>

        {/* ACTION BUTTONS */}
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
          New Event
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* MAIN CALENDAR */}
        <Grid size={{ xs: 12, lg: 9 }}>
          <Card>
            {/* CALENDAR HEADER */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton onClick={handlePreviousMonth}>
                    <Iconify icon={'solar:alt-arrow-left-bold' as any} width={20} />
                  </IconButton>
                  <Typography variant="h6" sx={{ fontWeight: 700, minWidth: 200, textAlign: 'center' }}>
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </Typography>
                  <IconButton onClick={handleNextMonth}>
                    <Iconify icon={'solar:alt-arrow-right-bold' as any} width={20} />
                  </IconButton>
                </Box>
                <Button variant="outlined" size="small" onClick={handleToday}>
                  Today
                </Button>
              </Box>

              {/* CATEGORY FILTERS */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label="All Events"
                  color={selectedCategory === 'all' ? 'primary' : 'default'}
                  onClick={() => setSelectedCategory('all')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip
                  icon={<Iconify icon={'solar:users-group-rounded-bold' as any} width={16} />}
                  label="Meetings"
                  color={selectedCategory === 'meeting' ? 'primary' : 'default'}
                  onClick={() => setSelectedCategory('meeting')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip
                  icon={<Iconify icon={'solar:flag-bold' as any} width={16} />}
                  label="Deadlines"
                  color={selectedCategory === 'deadline' ? 'error' : 'default'}
                  onClick={() => setSelectedCategory('deadline')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip
                  icon={<Iconify icon={'solar:calendar-mark-bold' as any} width={16} />}
                  label="Events"
                  color={selectedCategory === 'event' ? 'success' : 'default'}
                  onClick={() => setSelectedCategory('event')}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip
                  icon={<Iconify icon={'solar:bell-bold' as any} width={16} />}
                  label="Reminders"
                  color={selectedCategory === 'reminder' ? 'warning' : 'default'}
                  onClick={() => setSelectedCategory('reminder')}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </Box>

            {/* WEEKDAY HEADERS */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <Box
                  key={day}
                  sx={{
                    p: 1.5,
                    textAlign: 'center',
                    fontWeight: 700,
                    color: 'text.secondary',
                    backgroundColor: 'action.hover',
                  }}
                >
                  {day}
                </Box>
              ))}
            </Box>

            {/* CALENDAR GRID */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
              }}
            >
              {renderCalendar()}
            </Box>
          </Card>
        </Grid>

        {/* UPCOMING EVENTS SIDEBAR */}
        <Grid size={{ xs: 12, lg: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Upcoming Events
              </Typography>

              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <Box key={event.id}>
                    {index > 0 && <Divider sx={{ my: 2 }} />}
                    <Box
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          '& .event-title': {
                            color: 'primary.main',
                          },
                        },
                      }}
                    >
                      {/* EVENT CATEGORY ICON */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${getCategoryColor(event.category)}15`,
                            border: 1,
                            borderColor: `${getCategoryColor(event.category)}30`,
                            flexShrink: 0,
                          }}
                        >
                          <Iconify
                            icon={getCategoryIcon(event.category) as any}
                            width={20}
                            sx={{ color: getCategoryColor(event.category) }}
                          />
                        </Box>

                        {/* EVENT DETAILS */}
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography
                            className="event-title"
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              mb: 0.5,
                              transition: 'color 0.2s',
                            }}
                          >
                            {event.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            • {event.startTime}
                          </Typography>
                          {event.project && (
                            <Chip
                              label={event.project}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: '0.65rem',
                                mt: 0.5,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Iconify
                    icon={'solar:calendar-bold' as any}
                    width={48}
                    sx={{ color: 'text.disabled', mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    No upcoming events
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
