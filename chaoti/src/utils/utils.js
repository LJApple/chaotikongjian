// 公共类
class Common {
    constructor() {
        this.serialize = this.serialize.bind(this)
        this.formatNumber = this.formatNumber.bind(this)
    }
    // 序列化对象
    serialize(obj) {
        if (!obj) return
        let str = ''
        Object.keys(obj).forEach(k => {
            if ( obj[k] || obj[k] === 0 ) str += `${k}=${obj[k]}&`
        })
        // for (let [k, v] of Object.entries(obj)) {
        //   if (v) str += `${k}=${v}&`
        // }
        return str.replace(/&$/g, '')
    }

    /**
     * 时间格式化
     * @param date Date 必填，时间对象
     * @param options Object 参数 sign：格式类型 format：时间类型（D--默认到天；T：默认到秒）
     * @return 时间字符串
     */
    formatTime(date, options = {
        sign: '-',
        format: 'T'
    }) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const times = [hour, minute, second].map(this.formatNumber).join(':')
        let ymd = null
        switch (options.sign) {
            case '/':
                ymd = [day, month, year].map(this.formatNumber).join(options.sign)
                break
            default:
                ymd = [year, month, day].map(this.formatNumber).join(options.sign)
                break
        }
        return options.format === 'T' ? (ymd + ' ' + times) : ymd
    }

    // 个位数数值前添加0
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }

    // 帧动画模拟
    requestAnimationFrame(callback) {
        let lastTime = 0
        const currTime = new Date().getTime()
        const timeToCall = Math.max(0, 16.7)
        // const timeToCall = 10
        const id = setTimeout(function () {
            callback(currTime + timeToCall)
        }, timeToCall)
        lastTime = currTime + timeToCall
        return id
    }
    // 过滤专题|商品详情html混乱属性
    filterGoodsDetailStr(str) {
        // html混乱属性
        let specialReg = /img=""|tag-p=""|gif=""|background-position:=""|right=""|top=""|background-size:=""|initial=""|background-repeat:=""|no-repeat=""|background-attachment:=""|scroll=""|background-origin:=""|background-clip:=""|border:=""|dotted=""|1px=""|gray=""/ig
        // html style标签样式
        let styleReg = /<style[^>]*>[^<]*<\/style>/ig
        // 过滤后台编码后的空格编码：%20
        let specialReg1 = /%20/g
        return str.replace(specialReg1, ' ').replace(styleReg, '').replace(specialReg, ' ')
    }
    /**
     * 计算字符串的字符长度（中文：2个字符 英文：1个字符）
     * @param {String} str 字符串参数
     */
    calcStrLen(str) {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length
    }

    /**
     * 过滤表情符号
     * @param {String} str 过滤的字符串
     * @return {String}
     * */
    filterEmoji(str) {
        return str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
    }

    /**
     * 单次定时器 setTimeout
     * @param { Function } fn 回调函数
     * @param { Number } time 周期时间
     * @return { Number } 定时器ID 
     * 小程序里面的定时器，根据情况在页面onHide onUnload钩子时清除相关的定时任务
     */
    setTimeout(fn = function () { }, time = 0) {
        const start = new Date()
        const state = setTimeout(() => {
            fn()
            // console.log('setTimeout-time', new Date() - start)
        }, time)
        return state

    }
    // 清除单次定时器 setTimeout
    clearTimeout(state) {
        clearTimeout(state)
    }

    /**
     * 循环定时器 setInterval
     * @param {Function} fn 回调函数
     * @param {num} time 周期时间
     * @return { Number } 定时器ID 
     * 小程序里面的定时器，根据情况在页面onHide onUnload钩子时清除相关的定时任务
     */
    setInterval(fn = function () { }, time = 0) {
        const start = new Date()
        let state = null
        const fun = () => {
            fn()
            state = setTimeout(fun, time)
            // console.log('setInterval-time', new Date() - start)
        }
        state = setTimeout(fun, time)
        return state
    }
    // 清除循环定时器 setInterval
    clearInterval(state) {
        clearTimeout(state)
    }
    /**
    * 截取中英文
    * @param {string} str 
    * @return { int } 长度 
    * 小程序里面的定时器，根据情况在页面onHide onUnload钩子时清除相关的定时任务
    */
    cutstr(str, len) {
        let str_length = 0
        let str_len = str.length
        let str_cut = new String()
        for (let i = 0; i < str_len; i++) {
            const a = str.charAt(i)
            str_length++
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4  
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...")
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串  
        if (str_length < len) {
            return str
        }
    }

    // 获取文本字符长度
    strLen(str, limitLen = 0) {
        let len = 0
        let atLen = 0
        const strLen = str.length
        for (let i = 0; i < strLen; i++) {
            len++
            const a = str.charAt(i)
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4  
                len++
                if (limitLen && len <= limitLen) atLen++

            }
        }
        return { len, atLen }
    }
    //去掉右边的空白 
    trimRight(s) {
        return str.replace(/[\s|\t\r\n]*$/, '')
    }

    // 判断数据类型
    isType(obj, type) {
        type = type.toString()
        let ty = Object.prototype.toString.call(obj).slice(8, -1)
        switch (type = '') {
            case 'Array': 
                ty = ty === 'Array' ? true : false
                break
            case 'Object': 
                ty = ty === 'Object' ? true : false
                break
            case 'Boolean': 
                ty = ty === 'Boolean' ? true : false
                break
            case 'Number': 
                ty = ty === 'Number' ? true : false
                break    
            case 'Null': 
                ty = ty === 'Null' ? true : false
                break 
            case 'Undefined': 
                ty = ty === 'Null' ? true : false
                break          
            default:
                ty
        }
        return ty
    }
    // json去重
    uniqueArray(array, key){
        var result = [array[0]]
        for(var i = 1; i < array.length; i++){
            var item = array[i]
            var repeat = false
            for (var j = 0; j < result.length; j++) {
                if (item[key] == result[j][key]) {
                    repeat = true
                    break
                }
            }
            if (!repeat) {
                result.push(item)
            }
        }
        return result
    }
}

module.exports = new Common()