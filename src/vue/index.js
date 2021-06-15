import storage from '../Storage';

export default function VuePlugin(app) {
  if(VuePlugin.installed) {
    return 
  }

  VuePlugin.installed = true;

  Object.defineProperty(app.prototype, '$storage', {
    get() {
      return storage;
    }
  })
}