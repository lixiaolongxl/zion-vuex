import HashHistory from './history/hash';
import install from './install';
import createMatcher from './create-matcher';

class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes);
    //创建hush路由
    this.history = new HashHistory(this);
  }

  match(location) {
    //路由匹配的
    return this.matcher.match(location);
  }
  // 路由跳转
  push(location) {
    this.history.transitionTo(location, () => {
      window.location.hash = location;
    });
  }
  // 初始化
  init(app) {
    const history = this.history;
    const setupListener = () => {
      history.setupListener();
    };
    // 监听路由变化
    history.transitionTo(history.getCurrentLocation(), setupListener);
    // history.listen((route) => {
    //   app._route = route;
    // });
  }
}

VueRouter.install = install;
export default VueRouter;
