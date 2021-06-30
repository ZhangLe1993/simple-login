<template>
  <div>
    <div id="login-box_home" :style="dialogVisible">
      <div class="login-box_l">
        <img :src="loginSide" alt="">
      </div>
      <div class="login-box_r">
        <div class="login-box_close" @click="handleClose"><i class="iconfont icon-guanbi"></i></div>
        <p class="login-box_logo"><img :src="logo2" alt=""></p>

        <p class="login-box_desc" :style="operationToolsVisibleStyle"><span>超过18,084,862名用户加入沐婉清网观看视频</span></p>

        <div class="operation-tools" :style="operationToolsVisibleStyle">
          <a class="new-phone-btn" href="javascript:void(0);" name="login_phone" @click="toPhoneLoginPanel(login)">
            <div class="contact-phone">
              <p>{{login?loginWA.title:registWA.title}}</p>
            </div>
            <div class="lastTime">（上次登录）</div></a>
          <!-- <a href="javascript:;" class="switch-login-passwd">账号密码登录</a> -->
          <div class="operation-tool contact-qq">
            <a name="login_qq" onclick="window.open('/?s=/Home/Auth/qqLogin','QQ登录到沐婉清网', 'width=600,height=520,left=200,top=200,toolbar=no,resizable=no')">
              <div class="operation-area">
                <i class="iconfont icon-waiyin-qq"></i>
              </div>
              <p>{{login?loginWA.qqLogin:registWA.qqRegist}}</p>
            </a>
          </div>
          <div class="operation-tool contact-wx">
            <a name="login_weixin" href="javascript:void(0);" @click="showWeixinPop()">
              <div class="operation-area">
                <i class="iconfont icon-waiyin-weixin"></i>
              </div>
              <p>{{login?loginWA.wxLogin:registWA.wxRegist}}</p>
            </a>
          </div>
        </div>

        <!-- 登录内容part -->
        <div :class="phoneLoginPanelVisibleClass">
          <p class="login-area_ways">
            <span :class="loginActive" name="tab_code_login" @click="toVerfyLoginPanel">验证码登录</span>
            <span name="tab_passwd_login" :class="loginNotActive" @click="toPasswordLoginPanel">账号密码登录</span>
          </p>
          <div class="login-area_content">
            <div :class="verfyLoginPanelVisible">
              <input @input="onChange" v-model="phone" type="text" maxlength="11" class="login-area_number js-input-phone js-focus-phone" name="phone_code_login" data-phone="login-area_number" placeholder="请输入手机号或邮箱"/>
              <div class="code">
                <input type="number" v-model="code" class="login-area_code js-area-code" name="code_code_login" data-area="login-area_code" placeholder="请输入验证码" autocomplete="off">
                <form theme="simple" onsubmit="return false;" style="height:100%;">
                  <button :class="showVerfyBtn" name="getcode_code_login">获取验证码</button>
                </form>
              </div>
              <button class="js-phone-login-btn login-area_item-passwd js-btn-submit" name="btn_code_login" @click="codeLogin">登录</button>
            </div>
            <div :class="passwordLoginPanelVisible">
              <input type="text" v-model="phone2" class="login-area_account js-focus-phone" name="phone_passwd_login" placeholder="请输入手机或邮箱" autocomplete="off">
              <div>
                <input type="password" v-model="password"  class="login-area_pwd" name="passwd_passwd_login" placeholder="请输入密码" autocomplete="off">
              </div>
              <a href="/register/resetPasswd" target="_blank">忘记密码</a>
              <button class="js-account-login-btn  js-btn-submit" name="btn_passwd_login" @click="passwordLogin">登录</button>
            </div>
          </div>
        </div>

        <!-- 注册内容part -->
        <div :class="phoneRegistPanelClass">
          <p class="regist-area_ways">
            <span :class="registActive" name="tab_code_regist" @click="toVerfyRegistPanel" >验证码注册</span>
            <span :class="registNotActive" @click="toPasswordRegistPanel" name="tab_passwd_regist">账号密码注册</span>
          </p>
          <div class="regist-area_content">
            <div :class="verfyRegistPanelVisible">

              <input  @input="onChange1" type="text" maxlength="11" v-model="phone3" class="regist-area_number js-input-phone js-focus-phone" name="phone_code_regist" data-phone="regist-area_number" placeholder="请输入手机号或邮箱">
              <div class="code">
                <input type="number" v-model="code3" class="regist-area_code js-area-code" name="code_code_regist" data-area="js-area-code" placeholder="请输入验证码" autocomplete="off">
                <form theme="simple" onsubmit="return false;" style="height:100%;">
                  <button :class="showVerfyBtn1" name="getcode_code_regist">获取验证码</button>
                </form>
              </div>
              <button class="js-phone-regist-btn js-btn-submit" name="btn_code_regist" @click="codeRegist" >注册</button>
            </div>
            <div :class="passwordRegistPanelVisible">
              <input  @input="onChange2" type="text" v-model="phone4" class="regist-area_account js-input-phone js-focus-phone" name="phone_passwd_regist" data-phone="regist-area_account" placeholder="请输入手机号或邮箱" autocomplete="off">
              <div class="code">
                <input type="number" v-model="code4" class="regist-area_code js-area-code" name="code_passwd_regist" data-area="regist-area_code" placeholder="请输入验证码" autocomplete="off">
                <form theme="simple" onsubmit="return false;" style="height:100%;">
                  <button :class="showVerfyBtn2" name="getcode_passwd_regist">获取验证码</button>
                </form>
              </div>
              <div>
                <input type="password" v-model="password4" class="regist-area_pwd js-area-pwd" name="passwd_passwd_regist" placeholder="请设置密码" autocomplete="off">
              </div>
              <button class="js-account-regist-btn js-btn-submit" name="btn_passwd_regist" style="margin-top: 15px;" @click="passwordRegist" >注册</button>
            </div>
          </div>
        </div>

        <div class="bottom-control">
          <p :class="goRegist" @click="toRegistPanel">没有账号？<span class="go-regist_span">立即注册</span></p>
          <p :class="goLoginPhone" @click="toLoginPanel">已有账号，<span class="go-login_span">立即登录</span></p>
          <p :class="goLoginQqWx" @click="toWexQQLoginPanel"><i class="iconfont icon-jiantouxiao-zuo"></i>微信/QQ登录</p>
          <p :class="goRegistQqWx" @click="toWexQQRegistPanel"><i class="iconfont icon-jiantouxiao-zuo"></i>微信/QQ注册</p>
        </div>
        <p :class="tkClass">注册即表明同意<a href="/protocol.html" target="_blank">使用条款和隐私策略</a></p>
      </div>
    </div>
    <div id="new-login-mask" :style="dialogVisible"></div>
  </div>
</template>

<script>
export default {
  name: "AccessPanel",
  props: {
    dialogVisible: String,
    closePanel: Function,
  },
  data() {
    return {
      operationToolsVisibleStyle: 'display:block;',
      phoneLoginPanelVisibleClass: 'login-area_new hide',
      phoneRegistPanelClass: 'regist-area_new hide',
      goLoginQqWx: 'go-login_qqwx hide',
      goRegistQqWx: 'go-regist_qqwx hide',
      goLoginPhone: 'go-login hide',
      goRegist: 'go-regist',
      showVerfyBtn: 'disabled js-get-verify-btn js-get-verify-btn-0',
      showVerfyBtn1: 'disabled js-get-verify-btn js-get-verify-btn-1',
      showVerfyBtn2: 'disabled js-get-verify-btn js-get-verify-btn-2',
      loginActive: 'active',
      loginNotActive: '',
      registActive: 'active',
      registNotActive: '',
      verfyLoginPanelVisible: 'login-area_item login-area_item-phone js-area_item',
      passwordLoginPanelVisible: 'login-area_item login-area_item-passwd js-area_item hide',
      verfyRegistPanelVisible: 'regist-area_item regist-area_item-phone js-area_item',
      passwordRegistPanelVisible: 'regist-area_item regist-area_item-passwd js-area_item hide',
      login: true,
      loginWA: { qqLogin: 'QQ登录', wxLogin: '微信登录', title: '手机/邮箱登录' },
      registWA: { qqRegist: 'QQ注册', wxRegist: '微信注册', title: '手机/邮箱注册' },
      tkClass: 'regist-text-tips hide',
      logo2: require("@/assets/logo2.png"),
      loginSide: require("@/assets/login-side_1.png"),
      //
      phone: '',
      code: '',
      phone2: '',
      password: '',
      phone3: '',
      code3: '',
      phone4: '',
      code4: '',
      password4: '',
    };
  },
  methods: {
    handleClose() {
      this.closePanel();
    },
    toPhoneRegistPanel() {
      this.operationToolsVisibleStyle = 'display:none;';
      this.phoneRegistPanelClass = 'regist-area_new';
      this.goRegistQqWx = 'go-regist_qqwx';
      this.goLoginQqWx = 'go-login_qqwx hide';
      this.tkClass = 'regist-text-tips hide';
    },
    toPhoneLoginPanel(login) {
      if(login) {
        this.operationToolsVisibleStyle = 'display:none;';
        this.phoneLoginPanelVisibleClass = 'login-area_new';
        this.goLoginQqWx = 'go-login_qqwx';
      } else {
        this.toPhoneRegistPanel();
      }
      // this.goLoginPhone = 'go-login';
    },

    toWexQQLoginPanel() {
      this.login = true;
      this.operationToolsVisibleStyle = 'display:block;';
      this.phoneLoginPanelVisibleClass = 'login-area_new hide';
      this.goLoginQqWx = 'go-login_qqwx hide';
      // this.goLoginPhone = 'go-login hide';
    },
    toWexQQRegistPanel() {
      this.login = false;
      this.operationToolsVisibleStyle = 'display:block;';
      this.phoneRegistPanelClass = 'regist-area_new hide';
      this.goRegistQqWx = 'go-regist_qqwx hide';
      // this.goLoginPhone = 'go-login hide';
    },
    showWeixinPop() {

    },
    // 登录面板密码和验证码切换
    toPasswordLoginPanel() {
      this.loginActive = '';
      this.loginNotActive = 'active';
      this.verfyLoginPanelVisible= 'login-area_item login-area_item-phone js-area_item hide';
      this.passwordLoginPanelVisible = 'login-area_item login-area_item-passwd js-area_item';
    },
    toVerfyLoginPanel() {
      this.loginActive = 'active';
      this.loginNotActive = '';
      this.verfyLoginPanelVisible= 'login-area_item login-area_item-phone js-area_item';
      this.passwordLoginPanelVisible= 'login-area_item login-area_item-passwd js-area_item hide';
    },

    // 注册密码和验证码面板切换
    toVerfyRegistPanel() {
      this.registActive = 'active';
      this.registNotActive = '';
      this.verfyRegistPanelVisible= 'regist-area_item regist-area_item-phone js-area_item';
      this.passwordRegistPanelVisible= 'regist-area_item regist-area_item-passwd js-area_item hide';
    },
    toPasswordRegistPanel() {
      this.registActive = '';
      this.registNotActive = 'active';
      this.verfyRegistPanelVisible= 'regist-area_item regist-area_item-phone js-area_item hide';
      this.passwordRegistPanelVisible= 'regist-area_item regist-area_item-passwd js-area_item';
    },
    /**
     *
     */
    toRegistPanel() {
      this.login = false;
      this.tkClass = 'regist-text-tips';
      this.goRegist = 'go-regist hide';
      this.goLoginPhone = 'go-login';
      this.toWexQQLoginPanel();
      this.toWexQQRegistPanel();
    },
    toLoginPanel() {
      this.login = true;
      this.tkClass = 'regist-text-tips hide';
      this.goRegist = 'go-regist';
      this.goLoginPhone = 'go-login hide';
      this.toWexQQRegistPanel();
      this.toWexQQLoginPanel();
    },
    onChange(e) {
      console.log(e);
      if(this.isPone(this.phone) || this.isEmail(this.phone)) {
        this.showVerfyBtn = 'js-get-verify-btn js-get-verify-btn-0';
      } else {
        this.showVerfyBtn = 'disabled js-get-verify-btn js-get-verify-btn-0';
      }
    },
    onChange1(e) {
      console.log(e)
      if(this.isPone(this.phone3) || this.isEmail(this.phone3)) {
        this.showVerfyBtn1 = 'js-get-verify-btn js-get-verify-btn-1';
      } else {
        this.showVerfyBtn1 = 'disabled js-get-verify-btn js-get-verify-btn-1';
      }
    },
    onChange2(e) {
      console.log(e)
      if(this.isPone(this.phone4) || this.isEmail(this.phone4)) {
        this.showVerfyBtn2 = 'js-get-verify-btn js-get-verify-btn-2';
      } else {
        this.showVerfyBtn2 = 'disabled js-get-verify-btn js-get-verify-btn-2';
      }
    },
    codeLogin() {
      const obj = { phone: this.phone, code: this.code };

      if(this.phone === '') {
        this.open('手机号或邮箱不能为空');
        return;
      }
      if(!this.isPone(this.phone) && !this.isEmail(this.phone)) {
        this.open('手机号或邮箱格式不正确');
        return;
      }
      if(this.code === ''){
        this.open('验证码不能为空');
        return;
      }
      console.log(obj);
    },
    passwordLogin() {
      const obj = { phone: this.phone2, password: this.password };
      if(this.phone2 === '') {
        this.open('手机号或邮箱不能为空');
        return;
      }
      if(!this.isPone(this.phone2) && !this.isEmail(this.phone2)) {
        this.open('手机号或邮箱格式不正确');
        return;
      }
      if(this.password === '') {
        this.open('密码不能为空');
        return;
      }
      console.log(obj);
    },
    codeRegist() {
      const obj = { phone: this.phone3, code: this.code3 };
      if(this.phone3 === '') {
        this.open('手机号或邮箱不能为空');
        return;
      }
      if(!this.isPone(this.phone3) && !this.isEmail(this.phone3)) {
        this.open('手机号或邮箱格式不正确');
        return;
      }
      if(this.code3 === ''){
        this.open('验证码不能为空');
        return;
      }
      console.log(obj);
    },
    passwordRegist() {
      if(this.phone4 === '') {
        this.open('手机号或邮箱不能为空');
        return;
      }
      if(!this.isPone(this.phone4) && !this.isEmail(this.phone4)) {
        this.open('手机号或邮箱格式不正确');
        return;
      }
      if(this.code4 === ''){
        this.open('验证码不能为空');
        return;
      }
      if(this.password4 === ''){
        this.open('密码不能为空');
        return;
      }
      const obj = { phone: this.phone4, code: this.code4, password: this.password4 };
      console.log(obj);
    },
    open(text) {
      this.$notify({
        title: '警告',
        message: text,
        type: 'warning'
      });
    },
    isPone(text) {
      var myreg = /^1[3,4,5,6,7,8]\d{9}$/;
      if (!myreg.test(text)) {
        return false;
      } else {
        return true;
      }
    },
    isEmail(text) {
      var myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (!myreg.test(text)) {
        return false;
      } else {
        return true;
      }
    },
    //
  },
}
</script>

<style scoped>

#login-box_home {
  width: 662px;
  height: 400px;
  display: none;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -330px;
  margin-top: -200px;
  z-index: 1002;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.3);
  border-radius: 10px;
  overflow: hidden;
  animation: winAlertIn .4s;
}

#new-login-mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
}

.login-box_l {
  width: 240px;
  height: 400px;
  background: #87ceeb;
  float: left;
}

.login-box_r {
  width: 420px;
  height: 400px;
  float: left;
  position: relative;
  box-sizing: border-box;
  padding: 30px;
}
div {
  display: block;
  padding: 0;
  margin: 0;
}

.login-box_close {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 0;
  top: 0;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.login-box_close i {
  display: block;
  color: #999;
  font-size: 14px;
  transition: .3s;
}

@font-face {
  font-family: "iconfont";
  /* IE9 */
  src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2')  /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */;
  /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-guanbi:before {
  content: "\e604";
}

.icon-guanbi:hover {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  transform: rotate(360deg);
}

.login-box_logo {
  height: 30px;
  margin: 10px auto 30px;
  text-align: center;
}

.login-box_logo img {
  height: 30px;
  display: inline-block;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

img {
  border: none;
}

.login-box_desc {
  height: 1px;
  display: block;
  background: #d8d8d8;
  position: relative;
  margin-bottom: 69px;
}

.login-box_desc span {
  font-size: 14px;
  color: #999;
  height: 20px;
  line-height: 20px;
  position: absolute;
  background: #fff;
  top: -9px;
  padding: 0 12px;
  left: 22px;
}

.operation-tools {
  overflow: hidden;
}

.new-phone-btn {
  font-size: 12px;
  line-height: 17px;
  position: absolute;
  left: 30px;
  bottom: 17px;
  color: #999;
}

a {
  color: #666;
  text-decoration: none;
  transition: all .2s;
  cursor: pointer;
}

.operation-tools .contact-phone {
  display: inline-block;
}

.operation-tools .lastTime {
  display: inline-block;
  font-size: 12px;
  cursor: default;
  margin-top: 0;
}

.contact-qq {
  margin-left: 47px;
}

.operation-tool {
  width: 100px;
  float: left;
  text-align: center;
  box-sizing: border-box;
}

.operation-tool.contact-qq .operation-area, .operation-tool.contact-qq .operation-area i, .operation-tool.contact-qq p {
  color: #2caeff;
  border-color: #2caeff;
}

.operation-tool .operation-area {
  width: 98px;
  height: 98px;
  background: #fff;
  border: 1px solid #f80;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: .2s;
}

.operation-tool .operation-area i {
  font-size: 46px;
  line-height: 98px;
  color: #f80;
  background: #fff;
  transition: .2s;
}

.operation-tool.contact-qq .operation-area:hover, .operation-tool.contact-qq .operation-area:hover i {
  background: #2caeff;
  color: #fff;
}

.icon-waiyin-qq:before {
  content: "\e603";
}

.contact-wx {
  float: right;
  margin-right: 47px;
}

.operation-tool.contact-wx .operation-area, .operation-tool.contact-wx .operation-area i, .operation-tool.contact-wx p {
  color: #69b813;
  border-color: #69b813;
}

.operation-tool .operation-area {
  width: 98px;
  height: 98px;
  background: #fff;
  border: 1px solid #f80;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: .2s;
}

.operation-tool.contact-wx .operation-area:hover, .operation-tool.contact-wx .operation-area:hover i {
  background: #69b813;
  color: #fff;
}

.icon-waiyin-weixin:before {
  content: "\e653";
}

.operation-tool p {
  font-size: 14px;
  color: #f80;
}

.hide {
  display: none;
}

.login-area_ways, .regist-area_ways {
  height: 30px;
  margin-bottom: 20px;
}

.login-area_ways span.active, .regist-area_ways span.active {
  color: #2caeff;
  border-color: #2caeff;
  padding: 0;
}

.login-area_ways span:nth-of-type(1), .regist-area_ways span:nth-of-type(1) {
  margin-left: 65px;
}

.login-area_ways span:nth-of-type(2), .regist-area_ways span:nth-of-type(2) {
  float: right;
  margin-right: 65px;
}

.login-area_ways span, .regist-area_ways span {
  line-height: 28px;
  border-bottom: 2px solid #fff;
  font-size: 14px;
  color: #999;
  float: left;
  cursor: pointer;
}

body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, input, textarea, p, th, td {
  padding: 0;
  margin: 0;
}

.login-area_content {
  padding: 0 5px;
}

.login-area_item input, .regist-area_item input {
  display: block;
  width: 100%;
  height: 40px;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  box-sizing: border-box;
  margin: 5px 0;
  line-height: 40px;
  font-size: 14px;
  padding: 0 12px;
  color: #333;
  position: relative;
  z-index: 2;
}

form, input, textarea {
  font-family: "微软雅黑", Microsoft YaHei, Arial, Verdana;
  outline: none;
}

.login-area_item div, .regist-area_item div {
  overflow: hidden;
}

.login-area_item div, .regist-area_item div {
}


.error-phone, .error-passwd, .error-verify {
  opacity: 0;
}

.error-passwd, .error-phone, .error-verify, .fd-tips {
  margin-bottom: 10px;
  display: none;
  color: #666;
  font-size: 12px;
  margin-bottom: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  outline: none;

}

input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

form {
  position: relative;
  font-family: "微软雅黑", Microsoft YaHei, Arial, Verdana;
  outline: none;
  padding: 0;
  margin: 0;
  display: block;
}

.login-area_item div button.disabled, .regist-area_item div button.disabled {
  color: #999;
  background: #f2f2f2;
  border: 1px solid #d8d8d8;
  cursor: not-allowed;
}

.icon-jiantouxiao-zuo:before {
  content: "\e628";
}

.login-area_item div.code button, .regist-area_item div.code button {
  margin: 5px 0;
}

.login-area_item div button, .regist-area_item div button {
  width: 120px;
  height: 42px;
  border-radius: 6px;
  float: right;
  font-size: 14px;
  cursor: pointer;
  outline: 0;
  background: #d7edff;
  border: 1px solid #a8d7ff;
  border-radius: 6px;
  color: #2caeff;
}

.login-area_item>button:hover, .regist-area_item>button:hover {
  background: #1395e7;
}

button {
  appearance: button;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: -internal-light-dark(buttontext, rgb(170, 170, 170));
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  background-color: -internal-light-dark(rgb(239, 239, 239), rgb(74, 74, 74));
  box-sizing: border-box;
  margin: 0em;
  font: 400 13.3333px Arial;
  padding: 1px 6px;
  border-width: 2px;
  border-style: outset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(195, 195, 195));
  border-image: initial;
}

.login-area_item div, .regist-area_item div {
  overflow: hidden;
}

.error-verify {
  display: none;
  clear: both;
  margin-top: -6px;
}


.login-area_item div.code input, .regist-area_item div.code input {
  width: 220px;
  float: left;
}


.error-passwd, .error-phone, .error-verify, .fd-tips {
  margin-bottom: 10px;
  display: none;
  color: #666;
  font-size: 12px;
  margin-bottom: 0;
}

.login-area_item>button, .regist-area_item>button {
  width: 100%;
  height: 42px;
  display: block;
  background: #2caeff;
  border-radius: 21px;
  font-size: 18px;
  color: #fff;
  border: 0;
  margin-top: 30px;
  outline: 0;
  cursor: pointer;
}

.js-phone-login-btn, .js-account-login-btn, .js-phone-regist-btn {
  width: 360px !important;
  position: absolute;
  bottom: 90px;
  margin: 0;
}

button {
  appearance: button;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: -internal-light-dark(buttontext, rgb(170, 170, 170));
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  background-color: -internal-light-dark(rgb(239, 239, 239), rgb(74, 74, 74));
  box-sizing: border-box;
  margin: 0em;
  font: 400 13.3333px Arial;
  padding: 1px 6px;
  border-width: 2px;
  border-style: outset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(195, 195, 195));
  border-image: initial;
}

.bottom-control {
  position: absolute;
  bottom: 17px;
  right: 30px;
  height: 17px;
  line-height: 17px;
}

.bottom-control p {
  font-size: 12px;
  color: #999;
  line-height: 17px;
}

.bottom-control p a, .bottom-control p span, .regist-text-tips a {
  color: #2caeff;
  user-select: none;
  cursor: pointer;
}

.go-login_qqwx, .go-regist_qqwx {
  position: absolute;
  right: 255px;
  width: 100px;
  bottom: 0;
  cursor: pointer;
  user-select: none;
}

.bottom-control p .iconfont {
  vertical-align: -2px;
}

.regist-text-tips {
  width: 100%;
  font-size: 10px;
  color: #999;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 63px;
}

#new-login-mask {
  width: 100%;
  height: 100%;
  display: none;
  background-color: rgba(0, 0, 0, .5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
}

.weixin-login-wrap {
  width: 400px;
  height: 450px;
  display: none;
  background-color: rgb(51, 51, 51);
  position: fixed;
  margin: -250px 0 0 -250px;
  padding: 50px 0 0 100px;
  left: 50%;
  top: 50%;
  z-index: 9998;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.3);
}

.weixin-login-title {
  width: 500px;
  height: 30px;
  background-color: #dee1e6;
  position: absolute;
  left: 0;
  top: 0;
}

.weixin-login-wrap .close-newcomer {
  width: 50px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  color: #000;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
}

.login-area_item a, .regist-area_item a {
  line-height: 17px;
  text-align: right;
  display: block;
  height: 0;
}

</style>