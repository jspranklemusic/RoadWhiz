export default function(x){
    const road = document.createElement('div')

    let xposition = x || 0

    road.classList.add('road')

    road.style=`
        left:${xposition}px;
    `
    road.classList.add('road-fullheight')

    gameArea.appendChild(road)
}