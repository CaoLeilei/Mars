<template>
  <el-dialog v-model="visible" title="表单标题">
    <el-form :model="formData" :rules="rules" ref="formRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.desc" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, Reactive, defineProps, computed } from "vue";
interface IFormData {
  name: string;
  desc: string;
}

const emit = defineEmits(["update:visible", "submit"]);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: null,
  },
});

// 判断是否为编辑功能
const isEdit = computed(() => {
  return props.data !== null;
});

const formData: Reactive<IFormData> = reactive({
  name: "",
  desc: "",
});

const rules = reactive({
})

const handleClose = () => {
  emit("update:visible", false);
}
// 提交表单
const handleSubmit = () => {
  // todo: 校验当前的佛
  console.log("handleSubmit");
};
</script>

<style lang="scss" scoped></style>