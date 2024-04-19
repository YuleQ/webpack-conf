import React, { useState } from 'react'
import  classes from './App.module.scss'
import { Link, Outlet } from 'react-router-dom'
import avatarPng from '@/assets/casper.png'
import avatarJpg from '@/assets/mqdefault.jpg'
import Cloud from '@/assets/cloud.svg'

export const App = () => {
    const [count , Setcount] = useState<number>(0)
    const increment = () => Setcount( prev => prev + 1 )

    // if(__PLATFORM__ === 'desktop') {
    //   return <div>desktop</div>
    // }

    // if(__PLATFORM__ === 'mobile') {
    //   return <div>mobile</div>
    // }

  return (
    <div>
      <div className={classes.test}>
        <p>test</p>
      </div>
      <div>
        <img width={100} height={100} src={avatarPng} alt="" />
        <img width={100} height={100} src={avatarJpg} alt="" />
      </div>
      <div>
        <Cloud className={classes.icon} width={200} height={200} />
      </div>
        <Link to={'/about'}>about</Link>
        <br />
        <Link to={'/shop'}>shop</Link>
        <h1 className={classes.value}>{count}</h1>
        <button className={classes.button} onClick={increment}> inc</button>
        <Outlet/>
        {/* <About/> */}
    </div>
  )
}
