import { CONFIG } from 'src/config-global';

import { TimesheetView } from 'src/sections/timesheet/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Timesheet - ${CONFIG.appName}`}</title>
      <meta name="description" content="Track your time and work hours" />

      <TimesheetView />
    </>
  );
}
