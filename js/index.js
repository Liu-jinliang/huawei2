
$(function(){
    const nickname = getCookie('nickname')
    // console.log(nickname)
    if(nickname){
        $('.login').addClass('hide')
        $('.login1').removeClass('hide').text(`欢迎您: 不离开***`)
        // $('.login2').removeClass('hide')
        // setCartNum()
    }else{
        $('.off').removeClass('hide')
        $('.on').addClass('hide')
    }

})
// ==================================================

$('.lr>ul>li').mouseenter(function(){

  $(this).addClass('active').siblings().removeClass('active')
  
  $(this).parent().next() .find('.btn').stop().slideDown()

  // $(this).parent().next().stop().slideDown()slideToggle()
})

$('.lr>ul>li').mouseleave(function(){
  $(this).parent().next().find('.btn').stop().slideUp()
})








// $('.btn').mouseout(function(){
//   $(this).stop().slideUp()
// })


// ==============================================

/* 0. 获取 ul */
let ol = document.querySelector('ol')

//1. 给 文本框 绑定给一个 input 事件
let inp = document.querySelector('input')
inp.addEventListener('input', function () {

  // 2. 拿到文本框输入的内容
  // trim() 去除首位空格
  const value = this.value.trim()
  if (!value) return

  // 3. 准备发送请求
  // 动态创建 script 标签
  const script = document.createElement('script')
  // 准备一个请求地址
  // wd 这个参数要换成我文本框里面输入的内容
  const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=${value}&req=2&bs=%E5%8D%8E%E4%B8%BA&csor=2&cb=bindHtml&_=1607400194620`
//   const url = `https://www.vmall.com/search_keywords`
  script.src = url
  // 把 script 标签插入到页面里面
  document.body.appendChild(script)
 
  script.remove()
})

// 全局准备一个 jsonp 的处理函数
function bindHtml(res) {
//   console.log(res)


  // 没有 g 这个数据, 就不渲染页面了
  if (!res.g) {
    ol.classList.remove('active')
    return
  }
  // 代码来到这里, 表示有 g 这个数据, 渲染页面
  let str = ''

  for (let i = 0; i < res.g.length; i++) {
    str += `
      <li>${ res.g[i].q }</li>
    `
  }
 ol.innerHTML = str
  // 让 ul 显示出来
  ol.classList.add('active')
}


// ==============================

//选项卡
$('.bigbox1>ul>li').click(function(){
  // $(this).addClass('active').siblings().removeClass('active')
  // // console.log(this)
  // $(this).parent().parent().find('.bigbox1-1').addClass('hide').siblings().removeClass('hide')
  $(this) // 点击的 li
        .addClass('active')
        .siblings() // ul 下面的所有 li
        .removeClass('active')
        .parent() // ul
        // ol

        // console.log($(this).parent().parent().find('.bigbox1-1'))
        .siblings('.xxk')
        .find('.bigbox1-1')
        .eq($(this).index()) // 索引配套的那个 li
        .removeClass('hide')
        .siblings() // ol 下面所有的 li
        .addClass('hide')
})