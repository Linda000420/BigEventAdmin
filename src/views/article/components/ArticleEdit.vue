<script setup>
import { ref, nextTick } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import {
  artAddArticleService,
  artGetArticleInfoService,
  artEditArticleService
} from '@/api/article'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { baseURL } from '@/utils/request'
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
const editorRef = ref()

const open = async (row) => {
  visibileDraw.value = true //  显示抽屉

  if (row.id) {
    //  基于 id 发送请求，获取编辑对应的详情数据进行回显
    const res = await artGetArticleInfoService(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
  } else {
    // 重置
    formModel.value = {
      ...defaultForm.value
    }
    imgUrl.value = ''
    nextTick(() => {
      editorRef.value.setHTML('')
    })
  }
  formModel.value = { ...row }
}

// 上传图片
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  // 图片预览
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 存入 formModel
  formModel.value.cover_img = uploadFile.raw
}

// 设置文章
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formModel.value.state = state
  // 普通对象转换为 formData 对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    // 编辑
    const res = await artEditArticleService(fd)
    ElMessage.success(res.data.message)
    visibileDraw.value = false
    // 通知父组件
    emit('success', 'edit')
  } else {
    // 新增
    const res = await artAddArticleService(fd)
    ElMessage.success(res.data.message)
    visibileDraw.value = false
    // 通知父组件
    emit('success', 'add')
  }
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
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
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
