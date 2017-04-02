let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  LoadingComponent: MyLoadingComponent,
  serverSideRequirePath: path.join(__dirname, './MyComponent')
});
