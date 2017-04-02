let LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  LoadingComponent: MyLoadingComponent,
});
