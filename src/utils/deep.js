// 深拷贝
function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key]!==null) {
          result[key] = deepCopy(obj[key]);   //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
}
// 多维数组去重
var temp = []
function uniq(array){
  var results = [];
  temp = [];
  recursion(array) // 调用递归将多维数组变为一维数组再去重
  for (var i = 0, len = temp.length;i < len;i ++){
    for(var j = i + 1; j < len;j ++){
      if (temp[i] === temp[j]) {
        i ++
        j = i
      }
    }
    results.push(temp[i])
  }
  return results
}
// 新增递归函数
function recursion(array){
  var len = array.length
  for (var i = 0; i < len ;i ++) {
    if (typeof array[i] == 'object') { // 如若数组元素类型是object，则递归
      recursion(array[i])
    } else {
      temp.push(array[i]) // 否则添加到temp数组中
    }
  }
}
// 图片文件上传获取本地url 地址
function getObjectURL(file) {
  let url = null
  if (window.createObjcectURL != undefined) {
    url = window.createOjcectURL(file)
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}
//  多维数组遍历取id
function getId(arr, newArr) {
  newArr = newArr || []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item['id']) {
      newArr.push(item['id'])
      if (item['children']) {
        getId(item['children'], newArr)
      }
    }
  }
  return newArr
}
export default { deepCopy,uniq,getObjectURL,getId}