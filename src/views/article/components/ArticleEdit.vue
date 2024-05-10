<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// 控制抽屉显示隐藏
const visibileDraw = ref(false)

// 默认数据
const defaultForm = ref({
  title: '', //  标题
  cate_id: '', //  分类id
  content: '', //  文章内容
  cover_img: '', //  封面 file 对象
  state: '' //  状态
})

// 文章数据
const formModel = ref({ ...defaultForm.value })

// 上传图片
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  // 图片预览
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 存入 formModel
  formModel.value.cover_img = uploadFile.raw
}

const open = (row) => {
  visibileDraw.value = true //  显示抽屉

  if (row.id) {
    //  基于 id 发送请求，获取编辑对应的详情数据进行回显
  } else {
    // 重置
    formModel.value = {
      ...defaultForm.value
    }
  }
  formModel.value = { ...row }
}

// 对外暴露
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibileDraw"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    size="50%"
  >
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 本地预览，无需提交前上传 -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
