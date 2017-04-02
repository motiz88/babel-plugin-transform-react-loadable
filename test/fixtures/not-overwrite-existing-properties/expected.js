import Loadable from 'react-loadable';
let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  LoadingComponent: MyLoadingComponent,
  serverSideRequirePath: `${__dirname}/MyComponent`,
  webpackRequireWeakId: () => require.resolveWeak('./SomeOtherComponent')
});
