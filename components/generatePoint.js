export default function(x,y,id){
    const point = document.createElement('div')
    point.id="victory-point"
    point.classList.add('goal-point')
    point.style=`
        top:${y || 0}px;
        left:${x || 0}px;
    `

    document.getElementById(id || 'map1').appendChild(point)


}