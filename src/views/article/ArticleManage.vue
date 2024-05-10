<script setup>
import ChannelSelect from './components/ChannelSelect.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
const articleList = ref([
  {
    id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  }
])
// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 编辑文章
const onEditArticle = (row) => {
  console.log(row)
}

// 删除文章
const onDelArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>

    <!-- 表单 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="params.state" style="width: 250px">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="articleList">
      <el-table-column label="文章标题" prop="title" width="250px">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date"></el-table-column>
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
  </page-container>
</template>

<style lang="scss" scoped></style>
