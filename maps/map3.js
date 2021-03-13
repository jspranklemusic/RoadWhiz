import generateMyCar from '../components/generateMyCar.js'
import generateCar from '../components/generateCar.js'
import generatePoint from '../components/generatePoint.js'
import generateTree from '../components/generateTree.js'
import generatePothole from '../components/generatePothole.js'

export default {

    init(){
        const map = document.createElement('div')
        map.id="map1"
        map.innerHTML = `
        <div class="road-fullwidth"></div>
        <div class="road-middle"></div>

        `
        gameArea.appendChild(map)

        function populateTrees(x){
            let base = 450
            for(let i=0; i < 5; i++){
                generateTree(x,(base - (70 * i)))
            }
        }

        populateTrees(600);populateTrees(385);
        generatePothole(495,240);generatePothole(340,10);
        generateMyCar(525,400,0)


        generateCar({
            y:75,
            x:-50,
            angle:90,
            color:'car-pink',
            direction:'left-right'
        })
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:75,
                x:-50,
                angle:90,
                color:'car-pink',
                direction:'left-right'
            })
        },3000)



        generateCar({
            y:-10,
            x:1100,
            angle:270,
            color:'car-green',
            direction:'right-left'
        })
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:-10,
                x:1100,
                angle:270,
                color:'car-green',
                direction:'right-left'
            })
        },3000)

        
        generatePoint(10,10, map.id)
        
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