import React, {useState, useEffect, useRef} from 'react'

function Stopwatch() {
    // components re render when state changes
    // accumulate elapsed time intervals into a variable that is refreshed every 10ms 
    // use the setting of state of current time to trigger this rerender
    
    const [time, setTime] = useState(0)
    const elapsedTime = useRef(0)

    const [isRunning, setIsRunning] = useState(false)

    const id = useRef()

    useEffect(()=> {
        console.log('rerender!')
    })

    // the useEffect will run an interval block to increment elapsed time by 10ms,
    // every 10ms 
    useEffect(()=> { 
        console.log('inside useeffect')
        if (isRunning) {
            id.current = setInterval(()=>{
                setTime(Date.now()) // THESE DONT REALLY UPDATE UNTIL END OF BATCHING!
                console.log(time) // will show no change! BUT IT DOES NOT MEAN THAT COMPONENT IS NOT RERENDERING!
                elapsedTime.current += 10
            }, 10 )    
        }

        return () => {
            clearInterval(id.current)
        }
    },[isRunning])

    
    function start() {
        setIsRunning(true)
        console.log('started')
    }

    function stop() {
        setIsRunning(false)
        console.log('stopped')
    }

    return (
        <div>
            <p>{elapsedTime.current/1000}</p>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
        </div>
    )
}

export default Stopwatch