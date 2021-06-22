import History from './base';

export default class HashHistory extends History {
  constructor(router) {
    super(router);
    this.router = router;
  }

  getCurrentLocation() {
    return window.location.hash.slice(1);
  }

  setupListener() {
    window.addEventListener('hashchange', () => {
      
      this.transitionTo(this.getCurrentLocation());
    });
  }
}