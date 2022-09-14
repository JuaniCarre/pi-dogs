import React from "react";


export default function Page({cards, dogs, pagination}){
var page = []
    for(var i = 1; i<=Math.ceil(dogs/cards); i++){
    page.push(i)
    }

    return (<div>
        {page?.map((el) => (
            <button onClick={()=>pagination(el)}>{el}</button>
        ))}
    </div>)
}