import createRouteMap from './create-route-map';
import { createRoute } from './history/base';

function createMatcher(routes) {
  const { pathList, pathMap } = createRouteMap(routes);
  function addRoute(routes) {
    createRouteMap(routes, pathList, pathMap);
  }

  function match(locaiton) {
    return createRoute(pathMap[locaiton], {
      path: locaiton,
    });
  }

  return {
    addRoute,
    match,
  };
}

export default createMatcher;