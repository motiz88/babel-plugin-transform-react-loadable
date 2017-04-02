import _path from 'path';
import L from 'react-loadable';
import Loadable from 'not-react-loadable';
let C1 = L({
  loader: () => import('./MyComponent'),
  serverSideRequirePath: _path.join(__dirname, './MyComponent'),
  webpackRequireWeakId: () => require.resolveWeak('./MyComponent')
});
let C2 = Loadable({
  loader: () => import('./MyComponent')
});
