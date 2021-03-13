export default function generateCar(props){
    /*
    props:{ 
        y:10,
        x:34,
        angle:90,
        color:'car-blue',
        direction:'left-right',
        speed:4
    }
    */

    let car = document.createElement('div')
    let yGeneratedPosition,xGeneratedPosition,carRotationAngle,color,direction,speed,yEnd,xEnd

    if(!props){
        yGeneratedPosition = -100
        xGeneratedPosition = 225
        carRotationAngle = 180
        color = 'car-blue'
        direction = 'top-bottom'
        speed = 50
        
        
        
        //the lower the speed, the faster
    }else{
        yGeneratedPosition = props.y
        xGeneratedPosition = props.x
        carRotationAngle = props.angle
        color = props.color
        direction = props.direction
        speed = props.speed || 50
    }
    
    gameArea.appendChild(car)

    car.classList.add('car');
    car.classList.add(color);

    //all crashable objects have the 'crashable' attribute
    car.setAttribute('crashable',true)
    car.style.top=`${yGeneratedPosition}px`;
    car.style.left=`${xGeneratedPosition}px`;
    car.style.transform=`rotateZ(${carRotationAngle}deg)`
    
    car.innerHTML = `
        <div class="car-inner">

            <div class="wheel backleft"></div>
            <div class="wheel backright"></div>
            <div class="wheel frontleft"></div>
            <div class="wheel frontright"></div>
            
            <div class="windshield"></div>
            <div class="back-windshield"></div>
            <div class="door door-left"></div>
            <div class="door door-right"></div>

            <div class="mirror-left"></div>
            <div class="mirror-right"></div>

            <div class="headlight headlight-left"></div>
            <div class="headlight headlight-right"></div>
            
            </div>

            
    `   
        let index = parseInt(Math.random()*10000)+"-"+Date.now()
        
        // for(let interval in objIntervals){
        //     if(objIntervals['car'+index]){
        //         index++
        //     }else{
        //         break
        //     }
        // }
        
        //the movement functions
        function moveToptoBottom(){

            yGeneratedPosition +=4
            car.style.top=`${yGeneratedPosition}px`;
            if(yGeneratedPosition> (500 + car.offsetHeight)) {
                clearInterval(objIntervals['car'+index]) 
                delete objIntervals['car'+index]
                car.remove()    
                generateCar(props)
                return 
       
                
            }
        }

        function moveBottomToTop(){

            yGeneratedPosition -=4
            car.style.top=`${yGeneratedPosition}px`;
            if(yGeneratedPosition < 0 - car.offsetHeight) {
                clearInterval(objIntervals['car'+index])
                delete objIntervals['car'+index]
                car.remove()
                generateCar(props)
                return     
            }
        }


        function moveLeftToRight(){

            xGeneratedPosition +=4
            car.style.left=`${xGeneratedPosition}px`;
            if(xGeneratedPosition>1000+car.offsetWidth) {
                clearInterval(objIntervals['car'+index])
                delete objIntervals['car'+index]
                car.remove()
                generateCar(props)
                return

                 
            }
        }

        function moveRightToLeft(){

            xGeneratedPosition -=4
            car.style.left=`${xGeneratedPosition}px`;
            if(xGeneratedPosition<0 - car.offsetHeight) {
                clearInterval(objIntervals['car'+index])
                delete objIntervals['car'+index]
                car.remove()
                generateCar(props)
                return 

                
            }
        }

        



        objIntervals['car'+index] = setInterval(()=>{
            if(state.paused&&!state.gameStart) return


            if(direction == "top-bottom") moveToptoBottom()

            else if(direction == "left-right") moveLeftToRight()

            else if(direction == "right-left") moveRightToLeft()

            else if(direction == "bottom-top") moveBottomToTop()

    },speed)

}