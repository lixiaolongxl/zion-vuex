# zion-vue 手动实现vuex 代码，目的加深理解

## 下载
``` 
npm install -S zion-vuex
```
## 使用 
新建 store.js  
```js
import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from 'zion-vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    age: 7
  },
  getters: { // 不用多说
    getAge(state) { 
      return state.age + 5
    }
  },
  mutations: { // vuex约定了对state的操作函数都放在这里，使用commit方法触发
    changeAge(state, data) {
      state.age += data ;
    }
  },
  actions: { // vuex约定了异步类函数统一放在这里，dispatch方法触发
    syncChangeAge({ state, commit }, data) {
      // state.age = 0
      setTimeout(() => {
        commit('changeAge', data) // 这里我还没弄懂待会怎么实现{commit}的读取，在真实的Vuex中这里不加this也是可以运行的
      }, 1000);
    }
  }
})

```

```html
    <div>我今年： {{$store.state.age}}</div>
    <div>我今年： {{$store.getters.getAge}}</div>
    <button @click="$store.commit('changeAge',1)">increase</button>
    <button @click="$store.dispatch('syncChangeAge', 7)">reset</button>  
```
