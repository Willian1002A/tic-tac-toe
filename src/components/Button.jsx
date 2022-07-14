import React from 'react'
import './Button.css'

export default props =>{
    return (
        <div className='square'>
            <button className='button' onClick={e => props.click && props.click(props.pos,props.validPos)}>
                <div className={props.buttonClass} />
            </button>
        </div>
    )
}