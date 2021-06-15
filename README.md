# storage-hook

## 安装
> yarn add @didi/storage-hook -S
  
> npm install @didi/storage-hook -S

## 使用
- react hook使用
```js
import storage, { useLocal, useSession } from 'storage-hook' ;

// 已useLocal为例（useSession用法一致）
const [ value, setValue] = useLocal('xxx'); 
const clear = useLocal(); 

// 更新值 - 方式1
setValue({
  name: 'storage-hook'
});

// 更新值 - 方式2
setValue((pre) => {
  return {
    ...pre,
    version: '1.0.0'
  }
})

// 删除值
setValue()

// 清空所有本地缓存
clear();

// 排除集合中的字段有选择的删除
clear(['a', 'b'])
```
- vue插件使用
```js
import { VuePlugin } from 'storage-hook' ;
Vue.use(VuePlugin);
this.$storage.local.set('name', 'storage');

this.$storage.local.get('name'); // ===> storage
```
## 说明

也可单独引用storage对象

```js
storage
.set('local', {value: '对local进行操作'})
.get('x')
.end() // 切换模式
.set('session', {value: '切换成session操作'})
```
