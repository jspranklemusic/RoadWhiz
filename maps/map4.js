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
        <div class="road-fullwidth-bottom"></div>


        `
        gameArea.appendChild(map)
        generateMyCar(900,415,270)

        function populateTrees1(){
            let baseX = 940
            for(let i=0;i<15;i++){
                generateTree((baseX - i*60),285);
            }
        }
        function populateTrees2(){
            let baseX = 845
            for(let i=0;i<15;i++){
                generateTree((baseX - i*60),160);
            }
        }
        populateTrees1();populateTrees2();
        generatePothole(350,10); generatePothole(200,385);
        
        //x,y
        

        generateCar({
            y:-10,
            x:1100,
            angle:270,
            color:'car-cyan',
            direction:'right-left'
        })
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:-10,
                x:1100,
                angle:270,
                color:'car-cyan',
                direction:'right-left'
            })
        },5000)


       
  

        generateCar({
            y:75,
            x:-50,
            angle:90,
            color:'car-yellow',
            direction:'left-right'
        })
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:75,
                x:-50,
                angle:90,
                color:'car-yellow',
                direction:'left-right'
            })
        },5000)



        generateCar({
            y:415,
            x:-50,
            angle:90,
            color:'car-white',
            direction:'left-right'
        })

        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:415,
                x:-50,
                angle:90,
                color:'car-white',
                direction:'left-right'
            })
        },5000)

    

        generateCar({
            y:340,
            x:1090,
            angle:270,
            color:'car-blue',
            direction:'right-left'
        })
        timeouts[Math.random()] = new PausedTimeout(function(){
            generateCar({
                y:340,
                x:1090,
                angle:270,
                color:'car-blue',
                direction:'right-left'
            })
        },5000)

       

        
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