import { CONFIG } from 'src/config-global';

import { CalendarView } from 'src/sections/calendar/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Calendar - ${CONFIG.appName}`}</title>
      <meta name="description" content="View and manage your schedule" />

      <CalendarView />
    </>
  );
}
