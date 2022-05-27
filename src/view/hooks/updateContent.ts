import { ElMessage } from 'element-plus'
import localCache from '@/utils/cache'

export default function (
  formData: any,
  tableData: any,
  dialogVisible: any,
  query: string
) {
  const { newContent } = formData.value
  const id = formData.value.id
  const newTableData = localCache.getCache(query)

  if (newContent === '' || id === '') {
    return ElMessage({ message: '请输入内容', type: 'warning' })
  }

  if (newTableData.tableArr.find((item: any) => item.value === newContent)) {
    return ElMessage({ message: '要修改的内容已存在', type: 'error' })
  }

  if (+id > newTableData.tableArr.length) {
    return ElMessage({
      message: '要修改的ID不存在',
      type: 'error'
    })
  }

  newTableData.tableArr[id - 1] = { value: newContent }
  tableData.value = newTableData

  localCache.setCache(query, newTableData)
  dialogVisible.value = false

  formData.value = { id: '', newContent: '' }
  return ElMessage({ message: '修改成功', type: 'success' })
}
