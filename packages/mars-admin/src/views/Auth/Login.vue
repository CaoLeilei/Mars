<template>
  <div class="login">
    <div class="login__header">
      <h1>欢迎登录</h1>
      <p>请使用账号密码进行登录</p>
    </div>

    <el-form :model="form" :rules="rules" label-position="top" size="large" ref="loginFormRef" class="login-form">
      <el-form-item prop="username" class="login__form-item" label="账号（或者是邮箱）">
        <el-input v-model="form.username" placeholder="用户名" :maxlength="64"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="login__form-item" label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" maxlength="32"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login__button" @click="handleSubmitBtnClick" >
          登录
        </el-button>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <div class="login__footer">
      <div>没有账号，<RouterLink class="login__footer-link">立即注册</RouterLink></div>
      <div>
        <router-link class="login__footer-link">找回密码</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { RouterLink } from 'vue-router';
import { FormProps } from 'element-plus';

const form = reactive({
  username: '',
  password: '',
});

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

const loginFormRef: Ref<FormProps | null> = ref(null)

/**
 * 点击提交登录按钮的操作
 */
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
  @apply relative w-full h-auto;
  &__header {
    @apply relative flex flex-col items-center mb-10;

    h1 {
      @apply text-2xl font-bold mb-3;
    }
    p {
      @apply text-gray-500;
    }
  }

  &__form-item {
    @apply relative mb-10;
  }
  &__button {
    @apply w-full;
  }

  &__footer {
    @apply flex justify-between text-center relative text-gray-500;
  }
  &__footer-link {
    @apply relative text-blue-600 hover:text-blue-700;
  }
}
</style>