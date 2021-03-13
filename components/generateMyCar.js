export default function (x,y,r){
    //sets global mycar variable
    window.mycar = document.createElement('div')
    
    window.rotationAngle = r || 0
    window.xPosition = x || 330
    window.yPosition = y || 400

    mycar.id="my-car"
    mycar.classList.add('car');
    mycar.classList.add('car-red');

    //all crashable objects have the 'crashable' attribute
    mycar.style.top=`${yPosition}px`;
    mycar.style.left=`${xPosition}px`;
    mycar.style.transform=`rotateZ(${rotationAngle}deg)`

    gameArea.appendChild(mycar)

 
    
    mycar.innerHTML = `
        <div class="car-inner">
            <!-- the wheels -->
            <div class="wheel backleft"></div>
            <div class="wheel backright"></div>
            <div class="wheel frontleft"></div>
            <div class="wheel frontright"></div>
            
            <!-- the windshields -->
            <div class="windshield"></div>
            <div class="back-windshield"></div>
            <div class="door door-left"></div>
            <div class="door door-right"></div>

            <div class="mirror-left"></div>
            <div class="mirror-right"></div>

            <!-- the headlights -->
            <div class="headlight headlight-left"></div>
            <div class="headlight headlight-right"></div>
            
            </div>
    `
}