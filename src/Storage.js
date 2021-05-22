class Store {
  constructor(namespace = 'session') {
    const state = {
      local: window.localStorage,
      session: window.sessionStorage,
    };
    this.store = state[namespace];
    this.set = this.setItem;
    this.get = this.getItem;
    this.remove = this.removeItem;
  }

  static of(namespace) {
    return new Store(namespace);
  }

  get lenght() {
    return this.store.length;
  }

  get keys() {
    const len = this.lenght;
    const res = [];

    for (let index = 0; index < len; index++) {
      res.push(this.store.key(index));
    }
    return res;
  }

  /**
   * @description  : 主要针对花括号({})和中括号([])做了处理，区分对象、数组
   * @param         {string} name
   * @return        {string | undefined | null | object | array}
   */
  getItem(name) {
    const item = this.store.getItem(name);
    if (item === 'undefined') {
      return undefined;
    }

    if (item === 'null') {
      return null;
    }

    // 此处只判断存储的是不是object和数组,其他暂不实现
    if (/^[(\{)|(\"\[)]/.test(item)) {
      const parseStr = item.replace(/^[\'|\"](.*)[\'|\"]$/, ($1, $2) => $2.replace(/\\/g, ''));
      return JSON.parse(parseStr);
    }
    return item;
  }

  /**
   * @description  : 获取转换后的storage对象
   * @param         {string} name
   * @param         {any} value
   * @return        {this}
   */
  setItem(name, value) {
    this.store.setItem(
      name,
      (typeof value !== 'string' ? JSON.stringify(value) : value),
    );
    return this;
  }

  /**
   * @description  : 删除制定名称的storage
   * @param         {string} name
   * @return        {this}
   */
  removeItem(name) {
    this.store.removeItem(name);
    return this;
  }

  /**
   * @description  : 清空本地缓存
   * @return        {this}
   */
  clear(whiteList) {
    const list = (
      // eslint-disable-next-line no-nested-ternary
      Array.isArray(whiteList)
        ? whiteList
        : !whiteList ? [] : [whiteList]
    );

    if (list.length) {
      this.keys.forEach((key) => {
        if (!list.includes(key)) {
          this.removeItem(key);
        }
      });
      return this;
    }

    this.store.clear();
    return this;
  }

  key(index) {
    return this.store.key(index);
  }

  /**
   * @description  : 切换操作local <==> session
   * @param         {function?} cb
   * @return        {Store}
   */
  end(cb) {
    return (cb ? cb(Store) : Store);
  }
}

['local', 'session'].forEach((key) => {
  Store[key] = Store.of(key);
});

export default Store;
