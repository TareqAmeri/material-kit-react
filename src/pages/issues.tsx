import { CONFIG } from 'src/config-global';

import { IssuesView } from 'src/sections/issues/view';

export default function Page() {
  return (<><title>{`Issues - ${CONFIG.appName}`}</title><IssuesView /></>);
}
