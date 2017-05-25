//验证 ISBN 是否合法
function isISBNFormat (isbn){
    if(isbn.length === 13){
        //判断是否以 ‘978开头’
        return isbn.indexOf('978') === 0
    }
    return /^\d{10}$/.test(isbn)
}

// 金额由“分”转换成“元”
function priceFloat (price) {
    return parseFloat(price/100).toFixed(2)
}

// 金额由“元”转换成“分”
function priceInt (price) {
    return parseInt(price * 100)
}

// 判断两个对象是否相等
function isObjectValueEqual(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
}

// 判断支付方式
function checkPayChannel(pay_channel) {
    var pay_wx = /^wx/
    var pay_al = /^alipay/
    if (pay_wx.test(pay_channel)) {
        return '微信支付'
    }
    if (pay_al.test(pay_channel)) {
        return '支付宝'
    }
}

export {isISBNFormat, priceFloat, priceInt, isObjectValueEqual, checkPayChannel}
