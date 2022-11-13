export default function calculateData(arrs, type){
    var sum = 0
    console.log(arrs)
    console.log(type)
    arrs.map((item)=>{
        const fullStr = item[type]
        const lastIdx = fullStr.length - 1
        const lastChr = fullStr[lastIdx]
        if (lastChr == 'M'){
            let val = parseInt(fullStr.substring(0, lastIdx))
            sum += val * 1000000
        }
        else if (lastChr == 'K'){
            let val = parseInt(fullStr.substring(0, lastIdx))
            sum += val * 1000
        }
        else{
            sum += parseInt(fullStr.substring(0, lastIdx))
        }
    })

    var returnValue = ''
    console.log(sum)
    if (sum > 1000000){
        sum = sum / 1000000
        returnValue = sum.toString() + 'M'
    }
    else if (sum > 1000){
        sum = sum / 1000
        returnValue = sum.toString() + 'K'
    }
    else{
        returnValue = sum.toString()
    }
    console.log(returnValue)

    return returnValue
}