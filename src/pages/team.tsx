import { CONFIG } from 'src/config-global';

import { TeamView } from 'src/sections/team/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Team - ${CONFIG.appName}`}</title>
      <meta name="description" content="Manage team members and roles" />

      <TeamView />
    </>
  );
}
