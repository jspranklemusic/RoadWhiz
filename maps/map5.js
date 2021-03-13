import generateMyCar from '../components/generateMyCar.js'
import generateCar from '../components/generateCar.js'
import generatePoint from '../components/generatePoint.js'
import generateTree from '../components/generateTree.js'
import generatePothole from '../components/generatePothole.js'
import generateVertRoad from '../components/generateVertRoad.js'



export default {

    init(){
        const map = document.createElement('div')
        map.id="map1"
        map.innerHTML = `
            <div crashable="true" class="pavement"></div>

        `
        function populateTrees(x){
            let base = 440
            for(let i=0; i < 6; i++){
                generateTree(x,(base - (70 * i)))
            }
        }
        populateTrees(890);
        populateTrees(40);
        generateVertRoad(450);generateVertRoad(275);generateVertRoad(100);
        

        gameArea.appendChild(map)
        generateMyCar(940,400,0)
        // generatePothole()
        generatePoint(25,10, map.id)

        //1st road, left 
        generateCar({
            y:500,
            x:120,
            angle:0,
            color:'car-cyan',
            direction:'bottom-top'
        })
        
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:500,
                x:120,
                angle:0,
                color:'car-cyan',
                direction:'bottom-top'
            })
        },4000)
        

        //1st road, right
        generateCar({
            y:-190,
            x:200,
            angle:180,
            color:'car-yellow',
            direction:'top-bottom'
        })

        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:-190,
                x:200,
                angle:180,
                color:'car-yellow',
                direction:'top-bottom'
            })
        },4000)
        
        //2nd road, left
        generateCar({
            y:750,
            x:300,
            angle:0,
            color:'car-pink',
            direction:'bottom-top'
        })
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:750,
                x:300,
                angle:0,
                color:'car-pink',
                direction:'bottom-top'
            })
        },4000)

        //2nd road, right
        generateCar({
            y:-100,
            x:370,
            angle:180,
            color:'car-blue',
            direction:'top-bottom'
        })
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:-100,
                x:370,
                angle:180,
                color:'car-blue',
                direction:'top-bottom'
            })
        },4000)

        //3rd road, left
        generateCar({
            y:850,
            x:480,
            angle:0,
            color:'car-black',
            direction:'bottom-top'
        })
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:850,
                x:480,
                angle:0,
                color:'car-black',
                direction:'bottom-top'
            })
        },4000)

        //3rd road, right
        generateCar({
            y:-200,
            x:550,
            angle:180,
            color:'car-green',
            direction:'top-bottom'
        })
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:-200,
                x:550,
                angle:180,
                color:'car-green',
                direction:'top-bottom'
            })
        },4000)

    
       
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