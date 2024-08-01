<template>
  <el-dialog v-model="modalVisible" class="create-project" title="创建项目" width="800px">
    <el-form :model="formData" :rules="rules" ref="formRef" label-position="top">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="选择模板：" prop="tpl" required>
            <div class="create-project__tpls"></div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="模板：" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="项目名称：" prop="username" required>
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="项目描述：" prop="desc" required>
            <el-input type="textarea" resize="none" :rows="3"></el-input>
          </el-form-item>
          <!-- <el-form-item label="项目图标：" prop="desc" required>
          </el-form-item> -->
        </el-col>
      </el-row>
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

const modalVisible = computed({
  get: () => props.visible,
  set: (val) => emit("update:visible", val),
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

<style lang="scss" scoped>
.create-project {
  &__tpls {
    @apply block w-full h-[450px] box-border border border-gray-300 rounded-md;
  }
}
</style>