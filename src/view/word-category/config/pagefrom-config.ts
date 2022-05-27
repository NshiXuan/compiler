import { ref } from 'vue'

export const formItem = ref([
  { label: '标识符', filed: 'identifier' },
  { label: '保留字', filed: 'reservedWord' },
  { label: '无符号整数', filed: 'unsignedInt' },
  { label: '单字符分界符', filed: 'singleCharacter' },
  { label: '双字符分界符', filed: 'doubleCharacter' },
  { label: '注释头符', filed: 'firstNote' },
  { label: '注释尾符', filed: 'lastNote' },
  { label: '字符起始、结束符', filed: 'startOrEnd' },
  { label: '数组下标界限符', filed: 'arrayCharacter' }
])
