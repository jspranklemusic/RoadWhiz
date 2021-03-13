import generateMyCar from '../components/generateMyCar.js'
import generateCar from '../components/generateCar.js'
import generateTree from '../components/generateTree.js'
import generatePoint from '../components/generatePoint.js'
import generatePothole from '../components/generatePothole.js'


export default {

    init(){
        const map = document.createElement('div')
        map.id="map1"
        map.innerHTML = `
            <div id="road1"></div>
            <div class="road1-right"></div>

        `
        gameArea.appendChild(map)

        function populateTrees(x){
            let base = 440
            for(let i=0; i < 7; i++){
                generateTree(x,(base - (70 * i)))
            }
        }

        populateTrees(160);populateTrees(420);
        generatePothole(300,100)
        generatePoint(225,10, map.id)
        generateMyCar(230,375,0)
        generateCar()
    },

    destroy(){
        for(let interval in objIntervals){
            clearInterval(objIntervals[interval])
            objIntervals[interval] = null
        }
        for(let interval in myIntervals){
            clearInterval(objIntervals[interval])
            objIntervals[interval] = null
        }
        document.getElementById('map1').remove()
        document.getElementById('my-car').remove()
        document.querySelectorAll('[crashable="true"]').forEach(element=>{
            element.remove()
        })
    },

    reset(){
        this.destroy()
        this.init()
    }

    
}