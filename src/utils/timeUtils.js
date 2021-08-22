// TODO: ayrı utils altına al bu clock fonklarını
// seconds to time string [for clock component]
export function secsToTimeString(secs) {
    secs = Math.round(secs);
    let hours = Math.floor(secs / (60 * 60));

    let divisorForMinutes = secs % (60 * 60);
    let minutes = Math.floor(divisorForMinutes / 60);

    let divisorForSeconds = divisorForMinutes % 60;
    let seconds = Math.ceil(divisorForSeconds);
    
    const secondsStr = makeNumberTwoDigitString(seconds);
    const minutesStr = makeNumberTwoDigitString(minutes);
    const hoursStr = makeNumberTwoDigitString(hours);

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}


function makeNumberTwoDigitString(num) {
    let numStr = num.toString();

    if(numStr.length < 2) {
        return `0${numStr}`;
    }
    return numStr;
}