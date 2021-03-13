import React, { useEffect, useRef } from 'react'

interface OutsideClickListenerProps {
  onOutsideClick: () => void
  children: React.ReactNode
}

const useOutsideAlerter = (ref, onOutsideClick) => {
  useEffect(() => {
    function handleClickOutside (event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onOutsideClick])
}

const OutsideClickListener = ({ onOutsideClick, children }: OutsideClickListenerProps) => {
  const ref = useRef(null)
  useOutsideAlerter(ref, onOutsideClick)

  return (
    <div ref={ref}>
      {children}
    </div>
  )
}

export default OutsideClickListener
