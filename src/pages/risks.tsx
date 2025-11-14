import { CONFIG } from 'src/config-global';

import { RisksView } from 'src/sections/risks/view';

export default function Page() {
  return (<><title>{`Risks - ${CONFIG.appName}`}</title><RisksView /></>);
}
