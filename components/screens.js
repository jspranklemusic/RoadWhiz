export default function(text){
    //title
    //content
    //button

    const gameArea = document.getElementById('game-area')
    const screen = document.createElement('div')
    screen.classList.add('screen','fadeinslide')
    screen.id="screen"

    let button

    if(text.button) button = `<button id="continue-btn" class="btn">${text.button}</button>`
    else button = ""

    screen.innerHTML=`
    <div style="position:relative">
        <div class="welcome-content">
            <h1 class="screen-heading" >${text.title}</h1>
            <p class="screen-description" >${text.content}</p>
            <br>
            ${button}
        </div>
    </div>
    `
    gameArea.appendChild(screen)

    if(button){
        document.getElementById('continue-btn').addEventListener('click',function handleClick(){
            killScreen()
            document.removeEventListener('click',handleClick)
        })
    }
}