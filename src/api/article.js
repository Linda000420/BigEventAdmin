import request from '@/utils/request'

// 获取文章分类
export const artGetChannelsService = () => request.get('/my/cate/list')

// 添加文章分类
export const artAddChannelService = ({ cate_name, cate_alias }) =>
  request.post('/my/cate/add', { cate_name, cate_alias })

// 编辑文章分类
export const artEditChannelService = ({ id, cate_name, cate_alias }) =>
  request.put('/my/cate/info', { id, cate_name, cate_alias })
