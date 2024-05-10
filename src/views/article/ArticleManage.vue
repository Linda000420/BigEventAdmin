<script setup>
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'

const articleList = ref([]) //  文章列表
const total = ref(0) //  总条数
const loading = ref(false) //  loading状态
// 定义请求参数对象
const params = ref({
  pagenum: 1, //  当前页
  pagesize: 5, //  当前显示的每页条数
  cate_id: '',
  state: ''
})

// 获取文章列表
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()

// 选择显示条数
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}

// 跳转页数
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 搜索文章
const onSearch = () => {
  params.value.pagenum = 1 //  重置页
  getArticleList()
}

// 重置搜索
const onReset = () => {
  params.value.pagenum = 1 //  重置页
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const articleEditRef = ref()
// 添加文章
const onAddArticle = () => {
  articleEditRef.value.open({})
}

// 编辑文章
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}

// 添加 / 编辑成功回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 添加渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}

// 删除文章
const onDelArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary"> 添加文章 </el-button>
    </template>

    <!-- 表单 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title" width="250px">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="{ row }">
          <el-button
            @click="onEditArticle(row)"
            type="primary"
            :icon="Edit"
            circle
            plain
          ></el-button>
          <el-button
            @click="onDelArticle(row)"
            type="danger"
            :icon="Delete"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屉 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style lang="scss" scoped>
.el-select {
  width: 250px;
}
</style>
