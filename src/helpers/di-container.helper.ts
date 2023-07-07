export class DIContainer {
  private static instance: DIContainer;
  private container: Map<string, any>;

  constructor() {
    this.container = new Map();
  }

  static getInstance(): DIContainer {
    if (!this.instance) {
      this.instance = new DIContainer();
    }

    return this.instance;
  }

  get<E>(key: string) {
    return this.container.get(key) as E;
  }

  set<E>(key: string, value: E) {
    this.container.set(key, value);
  }

  registry() {
    return this.container;
  }
}
