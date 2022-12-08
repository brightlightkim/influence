export default function calculateData(arrs, type){
    var sum = 0
    console.log(arrs)
    console.log(type)
    if (arrs === null || arrs.length === 0){
        return 0
    }
    arrs.forEach(element => {
        const fullStr = element[type]
        if (fullStr !== null){
            const lastIdx = fullStr.length - 1
            const lastChr = fullStr[lastIdx]
            if (lastChr === 'M'){
                let val = parseFloat(fullStr.substring(0, lastIdx))
                sum += val * 1000000
            }
            else if (lastChr === 'K'){
                let val = parseFloat(fullStr.substring(0, lastIdx))
                sum += val * 1000
            }
            else{
                sum += parseFloat(fullStr)
            }
        }
    })

    var returnValue = ''
    console.log(sum)
    if (sum > 1000000){
        sum = (sum / 1000000).toFixed(1)
        returnValue = sum.toString() + 'M'
    }
    else if (sum > 1000){
        sum = (sum / 1000).toFixed(1)
        returnValue = sum.toString() + 'K'
    }
    else{
        returnValue = sum.toString()
    }
    console.log('return value:'+returnValue)

    return returnValue
}