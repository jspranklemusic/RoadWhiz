export default function(x,y){
    const pothole = document.createElement('div')

    let xposition = x || 200
    let yposition = y || 200

    pothole.setAttribute('crashable',true)
    pothole.classList.add('pothole')

    pothole.style=`
        top:${yposition}px;
        left:${xposition}px;
    `

    pothole.innerHTML = `
    <div style="position:relative">
        <div class="pothole-striations"></div>
        <div class="pothole-striations2"></div>
    </div>
    `

    gameArea.appendChild(pothole)
}