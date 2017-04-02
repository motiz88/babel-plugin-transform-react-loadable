let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  LoadingComponent: MyLoadingComponent,
  webpackRequireWeakId: () => require.resolveWeak('./MyComponent')
});
