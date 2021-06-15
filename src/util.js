function type(obj, type) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLocaleLowerCase() === type;
}

export const assert = [
  'String', 
  'Object', 
  'Function', 
  'Array'
].reduce((init, key) => {
  init['is' + key] = function(target) {
    return type(target, key.toLocaleLowerCase());
  };
  return init;
}, {});
