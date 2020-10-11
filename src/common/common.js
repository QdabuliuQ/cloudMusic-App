
// 数字转换
export function toStringNum(num){
    if (num > 100000 && num < 999999) {
        let str = num.toString();
        let str2 = str.substring(2);
        let result = str.replace(str2,'万');
        return result
    }

    if (num > 1000000 && num < 9999999) {
        let str = num.toString();
        let str2 = str.substring(3);
        let result = str.replace(str2,'万');
        return result
    }
    // let toStr = parseInt(num)
    if (num > 10000000 && num < 99999999) {
        let str = num.toString();
        let str2 = str.substring(4);
        let result = str.replace(str2,'万');
        return result
    }

    if (num > 100000000) {
        let str = num.toString();
        let str2 = str.substring(1);
        let result = str.replace(str2,'亿');
        let result2 = result.slice(0,1) + '.' + result.slice(0)
        return result2
    }
    return num
}

// 毫秒转换
export function durationTime(time){
    return ((Math.floor(time / 1000) / 60) <= 9 ? 
    '0' + (Math.floor(time / 1000) / 60).toFixed(0) : (Math.floor(time / 1000) / 60).toFixed(0))
     + ':' + ((Math.floor(time / 1000) % 60).toFixed(0) <= 9 ? '0'+ (Math.floor(time / 1000) % 60) : (Math.floor(time / 1000) % 60))
}