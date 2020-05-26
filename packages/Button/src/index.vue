<template>
  <component
    :is="tagName"
    @click="handleClick"
    :class="classes"
    :disabled="disabled || loading"
    v-bind="tagProps"
  >
    <i class="iconfont icon-loading" v-if="loading"></i>
    <i class="iconfont" :class="icon" v-else></i>
    <span v-if="showSlot">
      <slot></slot>
    </span>
  </component>
</template>

<script>
// 定义前缀名称
const prefixCls = 'we'
export default {
  name: 'we-button',
  data() {
    return {
      showSlot: true
    }
  },
  props: {
    to: [String],
    type: String,
    size: {
      type: String,
      default: 'small'
    },
    icon: {
      type: String,
      default: ''
    },
    round: Boolean,
    circle: Boolean,
    disabled: Boolean,
    loading: Boolean,
    append: {
      type: Boolean,
      default: false,
      required: false
    },
    replace: {
      type: Boolean,
      default: false
    },
    htmlType: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'reset'].indexOf(value) !== -1
      }
    },
    target: {
      type: String,
      default: '_self',
      validator(value) {
        return ['_blank', '_self', '_parent', '_top'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    // 定义渲染元素
    tagName() {
      console.log(this.to)
      return this.to ? 'a' : 'button'
    },
    // 定义基础样式
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-${this.size}`]: this.size !== undefined,
          [`${prefixCls}-round`]: this.round === true,
          [`${prefixCls}-circle`]: this.circle === true,
          [`${prefixCls}-disabled`]: this.disabled === true,
          [`${prefixCls}-loading`]: this.loading === true,
          [`${prefixCls}-icon-only`]: !this.showSlot && this.loading
        }
      ]
    },
    linkUrl() {
      if (typeof this.to !== 'string') return null
      // 正常跳转,需要加 // 让浏览器自动识别http 还是https请求
      if (this.to.includes('//')) return this.to
      const router = this.$router
      if (router) {
        const current = this.$route
        // 解析目标位置(有append 不要写 / )
        const route = router.resolve(this.to, current, this.append)
        return route ? route.href : this.to
      }
      return this.to
    },
    tagProps() {
      if (this.to) {
        const { linkUrl, target } = this
        return { href: linkUrl, target }
      } else {
        return { type: this.htmlType }
      }
    }
  },
  methods: {
    // 给予事件
    handleClick(event) {
      // 如果用户控制台修改元素(防止某些重要按钮禁止了也可以使用)
      if (this.disabled === true || this.loading === true) return
      this.$emit('click', event)
    }
  },
  mounted() {
    this.showSlot = this.$slots.default !== undefined
  }
}
</script>

<style scoped>
@import url('//at.alicdn.com/t/font_1841150_1xluxkjrf93.css');
/* 基础 */
.we {
  display: inline-block;
  background-color: #fff;
  border: 1px solid #000;
  color: black;
  cursor: pointer;
  outline: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 4px;
}
.we:active {
  transform: scale(0.95);
}
/* 成功样式 */
.we-success {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}
.we-success:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
  transform: scale(0.95);
}
.we-success:focus,
.we-success:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}
/* 失败颜色 */
.we-error {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.we-error:active {
  background: #dd6161;
  border-color: #dd6161;
  color: #fff;
  transform: scale(0.95);
}
.we-error:focus,
.we-error:hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
/* 字体 */
.we-text {
  color: black;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
  border-color: transparent;
}
/* 大小 */
.we-mini {
  padding: 7px 15px;
}
.we-small {
  padding: 7px 15px;
}
.we-medium {
  padding: 10px 20px;
}
/* 圆角 */
.we-round {
  border-radius: 20px;
}
/* 圆形 */
.we-circle {
  border-radius: 50%;
  padding: 12px;
}
.we-disabled,
.we-disabled:focus,
.we-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
  transform: none;
}
.we-loading {
  position: relative;
  pointer-events: none;
}
.we-loading:before {
  pointer-events: none;
  content: '';
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, 0.35);
}
.we-icon-only {
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 16px;
  border-radius: 50%;
  line-height: 32px;
}
.iconfont {
  font-size: 16px;
  font-weight: bold;
}
.icon-loading {
  display: inline-block;
  animation: yj-rotate 1.5s linear infinite;
}
@keyframes yj-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
a {
  text-decoration: none;
}
</style>