function createRouteMap(routes, oldPathList, oldPathMap) {
    const pathList = oldPathList || [];
    const pathMap = oldPathMap || Object.create(null);
  
    routes.forEach((route) => {
      addRouteRecord(route, pathList, pathMap);
    });
    return {
      pathList,
      pathMap,
    };
  }
  
  function addRouteRecord(route, pathList, pathMap, parent) {
    const path = parent ? `${parent.path}/${route.path}` : route.path;
    const record = {
      path,
      component: route.component,
      parent,
    };
    if (!pathList.includes(path)) {
      pathList.push(path);
      pathMap[path] = record;
    }
  
    if (route.children) {
      route.children.forEach((o) => {
        addRouteRecord(o, pathList, pathMap, record);
      });
    }
  }
  export default createRouteMap;
  