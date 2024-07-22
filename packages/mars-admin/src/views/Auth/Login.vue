<template>
  <div>
    <el-form
      :model="form"
      :rules="rules"
      ref="loginFormRef"
      class="login-form"
    >
      <h3 class="title">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        @click="handleSubmitBtnClick"
        class="login-btn"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const form = reactive({
  username: '',
  password: '',
});

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

const loginFormRef = ref(null)

const handleSubmitBtnClick = () => {
  loginFormRef?.value?.validate((valid: boolean) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
}

</script>

<style lang="scss" scoped>
.login {
  @apply relative;
}
</style>