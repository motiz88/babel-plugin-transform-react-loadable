import Loadable from 'react-loadable';
let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  serverSideRequirePath: path.join(__dirname, './MyComponent'),
  LoadingComponent: MyLoadingComponent
});
