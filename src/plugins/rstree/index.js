import VTree from './tree'
import VSelectTree from './selectTree'
import VSearchTree from './searchTree'
VTree.install = function(Vue) {
  Vue.component('VTree', VTree)
}

VSelectTree.install = function(Vue) {
  Vue.component('VSelectTree', VSelectTree)
}
VSearchTree.install = function(Vue) {
  Vue.component('VSearchTree', VSearchTree)
}

export {VTree, VSelectTree, VSearchTree}

export default VTree
