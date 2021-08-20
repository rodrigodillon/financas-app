import React from 'react'

function Card (props) {
    return (
        <div className="card mb-3" style={{background:"rgba(0,0,0,0.4)", color:"white", boxShadow: "rgb(0 0 0 / 50%) -7px 20px 20px 8px"}}>
            <h3 className="card-header" style={{background:"rgba(0,0,0,0.3)"}} >{props.title}</h3>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}

export default Card;