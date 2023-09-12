import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css"
import { useRef } from "react";
import { motion } from "framer-motion";
import ThreeDotsWave from "./loadingDots";

const Question = ({ }) => {

  const questions = [
    {
      id: 1,
      question: 'How was your day?',
      options: { "Good": "My day was good", "Bad": "The day was not very good for me.", "Neutral": "It was a fine day...", "Meh": "idk" },
    },
    {
      id: 2,
      question: 'How was your night?',
      options: { "Gooad": "My nte was good", "Bad": "The nte was not very good for me.", "Neutral": "It was a fine nite..." },
    },
    {
      id: 3,
      question: 'How was your week?',
      options: { "Good": "My wek was good", "Bad": "The weak was not very good for me.", "Neutral": "It was a fine weeke..." },
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const pref = useRef();
  const [diaryText, setDiaryText] = useState("");
  const [extraText, setExtraText] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const text = document.getElementById("diarytext")

  const handleOptionClick = (option) => {
    // Handle user's option selection here (e.g., store it in state)
    console.log(`Selected option: ${option}`);

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle end of questions (e.g., submit the form)
      console.log('End of questions. Submitting...');
    }
  };

  // sleep function
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }



  const appendText = (option)=>{
      setExtraText(". "+currentQuestion.options[option]);
    
  }


  const submit = async ()=>{
    setDiaryText(diaryText+extraText)
    setExtraText("")

    if (currentQuestionIndex < questions.length - 1) {
      await sleep(1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);

    } else {
      // Handle end of questions (e.g., submit the form)
      console.log('End of questions. Submitting...');
    }
    window.scrollTo(0, 0)
  }

  const setExtraText_ = (e)=>{
    const et = e.target.value.replace(diaryText, "")
    setExtraText(et)
  }

  return (
    <>
    {false ?(
      <ThreeDotsWave/>
    ):<div className={"container-fluid h-100 position-absolute "}>
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-6 text-center d-flex justify-content-center align-items-center">
            <div className="row">
              <div className="col-md-6">
              <motion.div
          // animate this div so that it fades into existance
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          key={currentQuestion.id}
          >
                <h3>Test Your Knowledge</h3>
                <p>{currentQuestion.question}</p>
              </motion.div>
              </div>
            </div>
            <div className="col-md-6 my-4"  style={{marginTop: "18%" }}>
              <h5>Today's diary:</h5>
              <textarea
              
              id="diarytext"
                onChange={setExtraText_}
                style={{ fontWeight: diaryText ? "" : "100", width:"100%", height:"170px" }}
                value={diaryText+extraText}
                suppressContentEditableWarning="true"
              >
              </textarea>
            </div>
          </div>
          <motion.div
          className="row text-center"
          // animate this div so that it fades into existance
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          key={currentQuestion.id}
          >
          <div className="col-md-6 text-center">
            <div className="btn-group-vertical justify-content-center align-items-center d-flex">
              <div className="row">
              {Object.keys(currentQuestion.options).map((option, index) => {
                return <>
                <div className="col">
                <button key={index} className="btn btn-primary btn-lg rounded btn-block"
                onClick={e=>appendText(option=option)}>{option}</button>
                </div>
                </>
              })}
              </div>
            </div>
          </div>
          </motion.div>
        <div className="row text-center mx-auto w-auto">
          <button onClick={submit} className="btn btn-info">submit</button>
        </div>
        </div>
      </div>}
      
    </>
  )
}

export default Question