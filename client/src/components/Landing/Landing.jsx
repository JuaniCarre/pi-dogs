import React from 'react'
import { Link } from 'react-router-dom'
import style from './Landing.css'

export default function navLink(){
    return<>
    <div className={style.landing}>
        <Link className='style.Landing-button'to='/home'>Get started!</Link>
    </div>
    </>
}


