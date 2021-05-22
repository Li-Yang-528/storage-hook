# storage-hook

基于react封装的操作Storage的hook

## 安装
> yarn add storage-hook  
  
> npm install storage-hook

## 使用
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

## 说明

hook返回的值会和本地Storage值保持同步  
非react或不支持hooks的项目，可以引用storage对象

```js
storage
.set('local', {value: '对local进行操作'})
.get('x')
.end() // 切换模式
.set('session', {value: '切换成session操作'})
```
