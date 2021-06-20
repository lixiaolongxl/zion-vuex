'use strict';
let Vue;
class Store{
    constructor(options){
        this._vm = new Vue({
            data: {
              state: options.state
            }
        })
    }
    get state(){
        return this._vm.state;
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
    install,
  }
