import generateMyCar from '../components/generateMyCar.js'
import generateCar from '../components/generateCar.js'
import generatePoint from '../components/generatePoint.js'

export default {

    init(){
        const map = document.createElement('div')
        map.id="map1"
        map.innerHTML = `
            <div id="road1"></div>
            <div class="road1-right"></div>

        `
        gameArea.appendChild(map)

        generatePoint(325,10, map.id)
        generateMyCar(330,400,0)
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