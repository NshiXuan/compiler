import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

export default function (addValue: any, TableData: any, query: string) {
  const tableContentArr = localCache.getCache(query).tableArr
  if (addValue.value.trim() === '') {
    return ElMessage({
      message: '请输入内容',
      type: 'warning'
    })
  }
  if (tableContentArr.find((item: any) => item.value === addValue.value)) {
    return ElMessage({
      message: '关键字已存在',
      type: 'error'
    })
  } else {
    tableContentArr.push({ value: addValue.value })
    TableData.value.tableArr = tableContentArr
    localCache.setCache(query, TableData.value)
    addValue.value = ''
    return ElMessage({
      message: '添加成功',
      type: 'success'
    })
  }

}
