import Loadable from 'react-loadable';
let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  webpackRequireWeakId: () => require.resolveWeak('./MyComponent'),
  LoadingComponent: MyLoadingComponent
});
