import type { App } from 'vue';
import { Button } from './Button';
import Antd from 'ant-design-vue';
import VXETable from 'vxe-table';
import VXEUI from 'vxe-pc-ui';

export function registerGlobComp(app: App) {
  app.use(Antd).use(Button).use(VXETable).use(VXEUI);
}
