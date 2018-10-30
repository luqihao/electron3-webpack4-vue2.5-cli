<template>
  <div id="hello">
    <header :class="$style.title">{{title}}</header>
    <a href="otherpage.html">跳去main2页面</a>
    <main :class="$style.content">
      {{content}}
      <img src="../static/images/photo.png" width="500" height="300">
      <el-button type="primary" size="small">按钮</el-button>
      <router-link to="/">page1</router-link>
      <router-link to="page2">page2</router-link>
    </main>
    <footer :class="$style.footer">{{footer}}</footer>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        title: '页面一',
        content: '内容555',
        footer: '页脚222'
      }
    },
  }
</script>

<style lang="less" module>
  #hello {
    font-size: 50px;
    font-weight: 700;
    header {
      color: rgb(64, 41, 196);
    }
    main {
      color: lightgreen;
    }
    footer {
      color: lightyellow;
    }
  }
</style>


