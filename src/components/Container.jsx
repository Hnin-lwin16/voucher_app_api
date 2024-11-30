import React from 'react'

const Container = ({children,className}) => {
  return (
    <div className={` w-full md:w-[700px] xl:w-[1000px] mx-auto ${className}`}>
      {children}
    </div>
  )
}

export default Container
