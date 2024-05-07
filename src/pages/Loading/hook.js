
import React, { useRef } from 'react'

export const spinningLoaderRef = React.createRef()
export const startSpinning = () => {
  if (spinningLoaderRef.current) {
    spinningLoaderRef.current.start()
  }
}

export const stopSpinning = () => {
  if (spinningLoaderRef.current) {
    spinningLoaderRef.current.stop()
  }
}
