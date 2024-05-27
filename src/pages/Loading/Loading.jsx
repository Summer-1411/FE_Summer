import {Spin } from 'antd'
import React, { forwardRef, useEffect, useState } from 'react'
import MySpin from './MySpin'

const Loading = forwardRef((props, ref) => {
    const [spinning, setSpinning] = useState(false)
    const startSpinning = () => {
        setSpinning(true)
      }
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const stopSpinning = () => {
        setSpinning(false)
      }

  
      useEffect(() => {
        // Expose the functions through the ref
        if (ref && typeof ref === 'object') {
          (ref).current = {
            start: startSpinning,
            stop: stopSpinning,
          }
        }
      }, [startSpinning, stopSpinning, ref, spinning])
    return (
        <>
            {spinning && <MySpin />}
            {props.children}
        </>

    )
})

export default Loading