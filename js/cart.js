// jquery 的入口函数
$(function () {

  // const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  // console.log(cart)
  // 0. 进行登录判断
  // 如果没有登录, 直接跳转回登录页
  // 通过 cookie
  // const nickname = getCookie('nickname')
  // if (nickname) return window.location.href = '../pages/login.html'

//   // 1. 拿到 localStorage 里面的 cart 数据
  const cart = JSON.parse(window.localStorage.getItem('cart')) || []

  // 2. 判断 cart 的 length, 决定执行进行哪一个渲染
  if (!cart.length) {
    // 表示购物车没有数据
    // 购物车列表添加 hide 类名, 进行隐藏
    // $('.login').addClass('hide')
    // $('.off').removeClass('hide')
    // return
  }

  // 3. 能来到这里表示 cart 里面有数据
  // 就要进行渲染了
//   $('.off').addClass('hide')
//   $('.on').removeClass('hide')

  // 4. 根据 cart 进行页面渲染
  // 写一个方法进行渲染
  bindHtml()
  function bindHtml() {
    // 5. 进行一些数据的准备
    // 5-1. 决定全选按钮是不是选中
    // every()
    const selectAll = cart.every(item => item.is_select === '1')
    // 5-2. 计算选中的商品数量和价格
    let total = 0
    let totalMoney = 0
    cart.forEach(item => {
      if (item.is_select === '1') {
        total += item.cart_number - 0
        totalMoney += item.cart_number * item.goods_price
      }
    })

    let str = `
    <div class="qxk">
      <div class="checkbox">
          <input type="checkbox">
      </div>
      <div class="qxk2">
          <ul>
              <span class="span1">全选</span>
              <li>商品</li>
              <li>单价</li>
              <li>数量</li>
              <li>小计</li>
              <li>操作</li>
          </ul>
      </div>
    </div>
    <div class='list2'>
    <ol>
                  `
    cart.forEach(item => {
      str += `      

            <li>
                <input type="checkbox" data-id="${item.goods_id}" ${item.is_select == '0' ? '' : 'checked'}>
                <a href=""><img src="${ item.goods_small_logo }" alt=""></a>
                <p>
                    <span>${ item.goods_name }</span>
                    <b>分期免息</b>
                </p>
                <b>￥${ item.goods_price }</b>
                <div class="inp">
                    <button class="subNum" data-id="${ item.goods_id }">-</button>
                    <input type="text" value="${ item.cart_number }">
                    <button class="addNum" data-id="${ item.goods_id }">+</button>
                </div>
                <span>${ (item.goods_price * item.cart_number).toFixed(2)}</span>
                <div class="del">
                    <button class="del" data-id="${ item.goods_id }">删除</button>
                </div>
            </li>
      `
    })

    str += `
      </ol>
      </div>
        

      <div class="xiadan">
        <div class="zuo">
            <input value="${ total }"  type="checkbox">
                全选
        </div>
        <span class="del1">删除</span>
        <div class="you">
            <div class="you1">立即结算</div>
            <div class="you2">
                <div class="label">总计:</div>
                <span class="qian total">￥${ totalMoney.toFixed(2) }</span>
                <div class="num">已选择<span class="num1 cartNum">${ total }</span>件商品,优惠:200元</div>
            </div>
    
        </div>
    </div>

    `
    // 添加到指定标签内
    $('.list').html(str)
  }

  // 5. 给各个按钮添加点事件
  // 5-1. 每一个选择按钮的点击事件
  $('.list').on('click', '.list2  input', function () {
    // 拿到当前标签的状态
    // console.log(this)
    const type = this.checked
    // 拿到当前标签的 id
    const id = $(this).data('id')
    // 去 cart 里面找到 id 对应的数据, 把 is_select 修改一下
    const info = cart.filter(item => item.goods_id == id)[0]
    // console.log(cart)
    // console.log(info)
    info.is_select = type ? '1' : '0'
    // 从新渲染页面
    bindHtml()
    // 把最新的 cart 存起来
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // 5-2. 数量 ++
  $('.list').on('click', '.addNum', function () {
    // 拿到商品 id
    const id = $(this).data('id')
    // 找到 cart 中的对应商品
    const info = cart.filter(item => item.goods_id == id)[0]
    // 修改信息
    info.cart_number = info.cart_number - 0 + 1
    // 重新渲染页面
    bindHtml()
    // 从新保存起来
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // 5-3. 数量 --
  $('.list').on('click', '.subNum', function () {
    // 拿到商品 id
    const id = $(this).data('id')
    // 找到 cart 中的对应商品
    const info = cart.filter(item => item.goods_id == id)[0]
    // 判断 info 内的 cart_number 如果已经是 1 了, 就什么都不做了
    if (info.cart_number === 1) return
    // 修改信息
    info.cart_number = info.cart_number - 0 - 1
    // 重新渲染页面
    bindHtml()
    // 从新保存起来
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // 5-4. 删除操作
  $('.list').on('click', '.del', function () {
    // 拿到商品 id
    const id = $(this).data('id')
    // 删除指定数据
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].goods_id == id) {
        cart.splice(i, 1)
        break
      }
    }

    // 重新渲染页面
    bindHtml()
    // 从新保存起来
    window.localStorage.setItem('cart', JSON.stringify(cart))

    if (!cart.length) return window.location.reload()
  })


  $('.list').on('click','.checkbox>input',function(){
    // console.log(this)
    $('ol>li>input').prop('checked','checked')

  })
})


/*

<li>
              <div class="select">
                <input type="checkbox">
              </div>
              <div class="goodsImg">
                <img src="https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2200724510033/O1CN01d3hhJK1C79hCUAXBp_!!2200724510033.jpg_250x250.jpg_.webp" alt="">
              </div>
              <div class="goodsDesc">
                <p>我是一段秒数信息我是一段秒数信息我是一段秒数信息我是一段秒数信息我是一段秒数信息我是一段秒数信息我是一段秒数信息我是一段秒数信息</p>
              </div>
              <div class="price">
                ￥ <span class="text-danger">100.00</span>
              </div>
              <div class="count">
                <button>-</button>
                <input type="text" value="1">
                <button>+</button>
              </div>
              <div class="xiaoji">
                ￥ <span class="text-danger">100.00</span>
              </div>
              <div class="operate">
                <button class="btn btn-danger">删除</button>
              </div>
            </li>
*/
