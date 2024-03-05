class Router {
  constructor() {
      this.routes = [];
  }

  get(path, handler) {
      this.routes.push({ method: 'GET', path, handler });
  }

  resolve(method, path) {
      const route = this.routes.find(route => route.method === method && route.path === path);
      if (route) {
          return route.handler;
      } else {
          console.error('route not found');
          return null;
      }
  }
}


export default Router;
