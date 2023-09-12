import React, { useState } from "react";


const EndPage = ({diaryText_})=>{

    const [dirayText, setDiaryText] = useState(diaryText_);
    const [copied, setCopied] = useState(false);


    return(
        <>
            <div className="container text-center justify-content-center d-flex m-auto align-items-center  min-vh-100 flex-column">
            
            <h3>Thank you for this survey Friend....(most likely Aseer)</h3>
            <h5 className="my-4">Here, you can now edit your glorious work of art: </h5>

            <hr class="bg-danger border-2 border-top" style={{width: "90%", border:"1px solid black"}} />
            
            <div className="diary-text">
            <p contentEditable={true} onInput={(e)=>{setDiaryText(e.currentTarget.textContent); setCopied(false)}}>{dirayText}</p>
            <button className="my-3 btn btn-info rounded" onClick={e=>{navigator.clipboard.writeText(dirayText); setCopied(true)}}>{copied? "Copied!" : "Copy..."}</button>
            </div>
            <hr class="bg-danger border-2 border-top" style={{width: "90%", border:"1px solid black"}} />
            <p className="my-4">Tell me you liked it</p>
            
            </div>    
        </>
    )
}

export default EndPage