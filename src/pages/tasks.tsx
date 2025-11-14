import { CONFIG } from 'src/config-global';

import { TasksView } from 'src/sections/tasks/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Tasks - ${CONFIG.appName}`}</title>
      <meta name="description" content="Manage your tasks and to-dos" />

      <TasksView />
    </>
  );
}
