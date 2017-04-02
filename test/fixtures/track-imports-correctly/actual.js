import L from 'react-loadable';
import Loadable from 'not-react-loadable';
let C1 = L({
  loader: () => import('./MyComponent')
});
let C2 = Loadable({
  loader: () => import('./MyComponent')
});
