<template>
  <div>
    <el-button type="primary" round @click="login()">登录</el-button>
    <el-button type="primary" round @click="logup()">注册</el-button>
    <AccessPanel :dialogVisible="dialogVisible" :closePanel="closePanel" ref="accessPanel"></AccessPanel>
  </div>
</template>

<script>
import AccessPanel from '../components/AccessPanel';
// @ is an alias to /src
export default {
  name: 'Index',
  data() {
    return {
      show: 'display:none',
      dialogVisible: 'display:none;',
    }
  },
  methods: {
    closePanel() {
      this.dialogVisible = "display:none";
    },
    login() {
      this.dialogVisible = "display:block";
    },
    logup() {
      this.dialogVisible = "display:block";
      this.$refs.accessPanel.toRegistPanel();
    },

  },
  components: {
    AccessPanel: AccessPanel,
  },

}
</script>

<style scoped>

</style>
