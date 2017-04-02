let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  LoadingComponent: MyLoadingComponent,
  webpackRequireWeakId: () => require.resolveWeak('./MyComponent'),
  serverSideRequirePath: path.join(__dirname, './MyComponent'),
});
