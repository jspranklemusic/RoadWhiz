export default function(x,y){
    const tree = document.createElement('div')

    let xposition = x || 200
    let yposition = y || 200

    tree.setAttribute('crashable',true)

    tree.style = `
    width:20px;
    height:30px;
    position:absolute;
    top:${yposition}px;
    left:${xposition}px;
    `

    tree.innerHTML = `
    <div style="position:relative;">
        <div class="tree-top"></div>
        <div class="tree-middle"></div>
        <div class="tree-low"></div>
        <div class="tree-stem"></div>
    </div>
    `

    gameArea.appendChild(tree)
}