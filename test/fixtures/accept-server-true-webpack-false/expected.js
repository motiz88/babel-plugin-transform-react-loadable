import _path from 'path';
import Loadable from 'react-loadable';
let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  serverSideRequirePath: _path.join(__dirname, './MyComponent'),
  LoadingComponent: MyLoadingComponent
});
