import { CONFIG } from 'src/config-global';

import { FilesView } from 'src/sections/files/view';

export default function Page() {
  return (<><title>{`Files - ${CONFIG.appName}`}</title><FilesView /></>);
}
