import dva from 'dva';
import localStore from './utils/localStore';
import './utils/format';
import './index.less';
import createLoading from 'dva-loading';
import './utils/common';
import { message } from 'antd';
// 1. Initialize
let initialState = {};
if (localStore.getItem('EASYWRITEPC')) {
  initialState = JSON.parse(localStore.getItem('EASYWRITEPC'));
}
const app = dva({
  initialState,
  ...createLoading({
    effects: true,
  }),
  onError(e, dispatch) {
    console.log(e.message);
  }
});
window.beforeunload = window.onunload = function () {
  localStorage.setItem('EASYWRITEPC', JSON.stringify(app._store.getState()));
  message.success('数据已保存：)');
};
app.model(require('./models/notify'));
//
app.model(require('./models/user'));
app.model(require('./models/file'));

app.model(require('./models/route'));

app.model(require('./models/tableData'));

// 2. Plugins
// 3. Model

// 4. Router
app.router(require('./newRoute'));

// 5. Start
app.start('#root');

window.console.log = () => {};
