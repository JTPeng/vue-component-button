// 导入组件，组件必须声明 name
import WeButton from './src'

// 为组件提供 install 安装方法，供按需引入
WeButton.install = function (Vue) {
  Vue.component(WeButton.name, WeButton)
}

// 导出组件
export default WeButton
