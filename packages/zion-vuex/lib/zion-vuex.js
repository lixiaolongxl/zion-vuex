'use strict';
export const forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => callback(obj[key], key))
}
let Vue;
class Store{
    constructor(options){
        this._vm = new Vue({
            data: {
              state: options.state
            }
        })
        // 实现getters
        const getters = options.getters || {};
        this.getters = {};
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get:()=> {
                    return getters[key](this.state)
                }
            })
        })
        // 实现 mutations
        const mutations = options.mutations || {}
        this.mutations = {};
        Object.keys(mutations).forEach((mutationNam)=>{
            // mutationNam 函数
            this.mutations[mutationNam] = (payload)=>{
                // (this.state,payload)
                mutations[mutationNam](this.state, payload)
            }
        })

        // 实现 actions
        const actions = options.actions || {};
        this.actions = {};

        Object.keys(actions).forEach((actionName)=>{
            this.actions[actionName] = (payload)=>{
                actions[actionName](this,payload);
            }
        })
        
    }
    get state(){
        return this._vm.state;
    }
    commit = (type, payload) => { //保证当前this 当前store实例
        this.mutations[type](payload)
    }
    dispatch = (type, payload) => {
        this.actions[type](payload)
    }
    
}
const install = (_Vue)=>{
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            const { store = null } = this.$options
            if (store) {
                this.$store = store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}



export default {
    Store,
    install
  }
