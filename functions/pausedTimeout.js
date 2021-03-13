export default class {
  constructor(func,time){
      this.func = func
      this.time = time
      this.startTime = Date.now()
      this.timeout = setTimeout(this.func,time)
      this.pauseTimeout = ()=>{
        console.log(this.timeout)
        clearTimeout(this.timeout)
        this.timeout = null
        this.pauseTime = Date.now()
      }
      this.resumeTimeout = ()=>{
        if(!this.timeout && (this.time > (this.pauseTime - this.startTime))){
          this.timeout = setTimeout(this.func,(this.time - (this.pauseTime - this.startTime)))
        }
      }
      this.stopTimeout = ()=>{
        clearTimeout(this.timeout)
      }
      
    }
  }

