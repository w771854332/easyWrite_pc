import React from 'react';
import { Router, Switch, Route, routerRedux } from 'dva/router';
import App from './routes/app';
import dynamic from 'dva/dynamic';
const { ConnectedRouter } = routerRedux
function RouterConfig({ history, app }) {
  const Home = dynamic({
    app,
    component: () => import('./routes/Home'),
  });
  const Login = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Login'),
  });
  const WritePage = dynamic({
    app,
    models: () => [
      import('./models/tableData'),
    ],
    component: () => import('./routes/WritePage'),
  });
  const File = dynamic({
    app,
    models: () => [
      import('./models/notify'),
    ],
    component: () => import('./routes/File'),
  });
  const NotFound = dynamic({
    app,
    component: () => import('./routes/NotFound'),
  });
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/file/:id" component={File} />
          <Route exact path="/write/:id" component={WritePage} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
}

export default RouterConfig;