<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
import ChannelEdit from './components/ChannelEdit.vue'

const loading = ref(false)
const dialog = ref()
const channelList = ref([])
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

// 添加分类
const onAddChannel = () => {
  dialog.value.open({})
}

//  编辑分类
const onEditChannel = (row) => {
  dialog.value.open(row)
}

// 删除分类
const onDelChannel = (row, $index) => {
  console.log(row, $index)
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel" type="primary">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row：channelList 的每一项，index：下标 -->
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row, $index)"
            type="primary"
            :icon="Edit"
            circle
            plain
          ></el-button>
          <el-button
            @click="onDelChannel(row, $index)"
            type="danger"
            :icon="Delete"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channel-edit ref="dialog"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
