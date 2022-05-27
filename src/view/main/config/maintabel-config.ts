import { ref } from 'vue'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

let keywordArr = localCache.getCache('keyword').tableArr
let characterArr = localCache.getCache('character').tableArr
let singleArr = localCache.getCache('single').tableArr

export const mainTableData = ref(
  localCache.getCache('mainTableData') || {
    tableLabel: [
      { label: '行号', props: 'line' },
      { label: '单词内容', props: 'content' },
      { label: '单词种类', props: 'kind' }
    ],
    tableArr: [],
    showID: false
  }
)

export const wordAnalysis = (imgShow: any): any => {
  mainTableData.value.tableArr = []

  keywordArr = localCache.getCache('keyword').tableArr
  characterArr = localCache.getCache('character').tableArr
  singleArr = localCache.getCache('single').tableArr

  const textareaValue = JSON.stringify(localCache.getCache('textareaValue'))
  if (!textareaValue || textareaValue.trim() === '""') {
    imgShow.value = false
    localCache.setCache('imgShow', imgShow.value)
    // mainTableData.value.tableArr = []
    localCache.setCache('mainTableData', '')

    return ElMessage({
      message: '请输入内容',
      type: 'warning'
    })
  }

  // 1.把内容转通过分割换行的变成数组
  const lineItemArr = textareaValue.replace(/"/g, '').split('\\n')
  // console.log(lineItemArr)

  for (let i = 0; i < lineItemArr.length; i++) {
    // 2.把内容通过分割空格变为没有空格的数组
    const lineItem = lineItemArr[i].trim().split(' ')
    // console.log(lineItem)

    // 3.进行单词分析
    for (const item of lineItem) {
      if (item.lastIndexOf(';') !== -1) {
        // 3.1 以;结尾的句子
        // console.log(item, i + 1)

        // 3.1.1 获取;之前的字符
        const headStr = item.substring(0, item.length - 1)
        const keywordResult = keywordArr.find(
          (item: any) => item.value === headStr
        )
        if (keywordResult) {
          // 如果前面的字符为关键字
          addTableData(i, headStr, '关键字')
        } else {
          // 如果前面的字符不为关键字 可能为一个式子 把它们分为一个数组
          // const headStrArr = Object.values(headStr)
          // console.log(headStrArr)
          doubleAndAddAndSubSplit(headStr, i)
        }

        // 3.1.2 获取;逗号
        const comma = item.substring(item.length - 1, item.length)
        if (comma) {
          addTableData(i, comma, '单字符分界符')
        }
      } else if (item.substring(item.length - 1, item.length) === '.') {
        // console.log(item, i)

        // 3.3 结尾符.结尾

        // 3.3.1 拿到结尾符.前面的字符
        const headEndCharacter = item.substring(0, item.length - 1)
        if (headEndCharacter) {
          addTableData(i, headEndCharacter, '关键字')
        }

        // 3.3.2 拿到结尾符.
        const endCharacter = item.substring(item.length - 1, item.length)
        if (endCharacter) {
          addTableData(i, endCharacter, '程序结束')
        }
      } else {
        // 3。4 不存在逗号； 不存在数组  不存在.结尾符
        // console.log(item)

        addCharacterOrKeywordOrSingle(item, i)
      }
    }
  }

  imgShow.value = true
  localCache.setCache('mainTableData', mainTableData.value)
  localCache.setCache('imgShow', imgShow.value)

  ElMessage({
    message: '分析完成',
    type: 'success'
  })
}

const addTableData = (line: number, content: string | number, kind: string) => {
  mainTableData.value.tableArr.push({
    line: line + 1,
    content: content,
    kind: kind
  })
}

const doubleAndAddAndSubSplit = (str: string, i: number) => {
  // console.log(i)
  if (str.indexOf(':=') !== -1) {
    // 如果含有双字符:=
    // 1.获取:=前面的字符
    const doubleByteIndex = str.indexOf(':=')
    const headDouble = str.slice(0, doubleByteIndex)
    const headDoubleArr = Object.values(headDouble)
    for (const item of headDoubleArr) {
      addCharacterOrKeywordOrSingle(item, i)
    }

    //2.把:=加入到数组中
    addTableData(i, ':=', '双字符分界符')

    // 3.获取:=后面的字符
    //  如果还含有+ - := 等符号继续递归
    // 如果没有就是字符 添加到数组中
    const lastDouble = str.slice(doubleByteIndex + 2)
    if (lastDouble.indexOf('+') !== -1 || lastDouble.indexOf('-') !== -1) {
      singleCheck(lastDouble, i)
    } else {
      addCharacterOrKeywordOrSingle(+lastDouble, i)
    }
  } else {
    singleCheck(str, i)
  }
}

const addCharacterOrKeywordOrSingle = (item: string | number, i: number) => {
  // 如果为关键字
  if (keywordArr.find((keyword: any) => keyword.value === item)) {
    // console.log(item, '关键字')

    addTableData(i, item, '关键字')
  }

  // 如果为标识符
  else if (characterArr.find((character: any) => character.value === item)) {
    // console.log(item, '标识符')
    addTableData(i, item, '标识符')
  }

  // 如果为单字符分节符
  else if (singleArr.find((single: any) => single.value === item)) {
    // console.log(item, '单字符分界符')
    addTableData(i, item, '单字符分界符')
  }

  // 如果为整数
  else if (typeof item === 'number') {
    // console.log(item, '无符号整数')
    if (window.isNaN(item)) {
      return
    } else {
      addTableData(i, item, '无符号整数')
    }
  }

  // 如果都不属于上面的 说明语法错误
  else {
    // console.log(item, '其他')
    const res = singleArr.find((single: any) => {
      return item.indexOf(single.value) !== -1
    })
    // console.log(res)

    if (res) {
      singleCheck(item, i)
    } else {
      // 如果为注释 不添加
      if (
        item.indexOf('{') !== -1 ||
        item.indexOf('}') !== -1 ||
        !item.match(/[a-z]/i)
      ) {
        return
      }
      addTableData(i, item, '标识符')
    }
  }
}

// 检测字符串中是否含有单字符
const singleCheck = (str: string, i: number) => {
  const res = singleArr.find((single: any) => {
    return str.indexOf(single.value) !== -1
  })
  // console.log(str, 'str')
  // console.log(res, 'res')

  if (res) {
    // if (singleArr.find((single: any) => single.value === headDouble))
    // 如果函数有单字符
    // 1.获取单字符前面的字符 大概率为数字或标识符变量
    const doubleByteIndex = str.indexOf(res.value)
    const headDouble = str.slice(0, doubleByteIndex)
    console.log(headDouble, 'head')

    if (
      characterArr.find((character: any) => character.value === headDouble) ||
      keywordArr.find((keyword: any) => keyword.value === headDouble)
    ) {
      // 为标识符或者关键字
      addCharacterOrKeywordOrSingle(headDouble, i)
    } else {
      const singleOperator = singleArr.find((single: any) => {
        return headDouble.indexOf(single.value) !== -1
      })
      if (headDouble === '') {
        addTableData(i, res.value, '单字符分界符')
        singleLast(str, i, doubleByteIndex)
        return
      }
      if (singleOperator) {
        singleCheck(headDouble, i)
      } else {
        if (str.match(/[a-z]/i)) {
          addCharacterOrKeywordOrSingle(headDouble, i)
        } else {
          addCharacterOrKeywordOrSingle(+headDouble, i)
        }
      }
    }

    // 2.直接把单字符加入到数组
    addTableData(i, res.value, '单字符分界符')
    console.log(res.value, 'res value')

    singleLast(str, i, doubleByteIndex)
  }
}

const singleLast = (str: string, i: number, doubleByteIndex: number) => {
  // 3.获取单字符后面的字符 大概率为数字或标识符变量
  const lastDouble = str.slice(doubleByteIndex + 1)
  // console.log(lastDouble, 'last')

  // 3.1如果含有数组下标界限符
  const arrIndex = lastDouble.indexOf('..')
  if (arrIndex !== -1) {
    addCharacterOrKeywordOrSingle(lastDouble.slice(0, arrIndex), i)
    addTableData(i, '..', '数组下标界限符')
    singleCheck(lastDouble.slice(arrIndex + 2, lastDouble.length), i)
    return
  }

  if (
    characterArr.find((character: any) => character.value === lastDouble) ||
    keywordArr.find((keyword: any) => keyword.value === lastDouble)
  ) {
    // 为标识符或者关键字
    addCharacterOrKeywordOrSingle(lastDouble, i)
  } else {
    const singleOperator = singleArr.find((single: any) => {
      return lastDouble.indexOf(single.value) !== -1
    })
    if (lastDouble === '') {
      return
    }
    if (singleOperator) {
      singleCheck(lastDouble, i)
    } else {
      addCharacterOrKeywordOrSingle(+lastDouble, i)
    }
  }
}
