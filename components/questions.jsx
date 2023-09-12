import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css"
import { motion, AnimatePresence } from "framer-motion";
import EndPage from "./endPage";
import { getQuestions, getQuestion } from "../cosnstants";

const Questions = ({ }) => {

  // const questions = [
  //   {
  //     id: 1,
  //     question: 'How was your day?',
  //     options: {
  //       "Good": {
  //         "text": "My day was good",
  //         "nextQuestion": false
  //       },
  //       "Bad": {
  //         "text": "The day was not very good for me.",
  //         "nextQuestion": {
  //           question: "Why was your day bad?",
  //           options: {
  //             "I dont Know":
  //               { "text": "I dont know why my day was bad...", nextQuestion: false },
  //             "Beacuse of my sibling(s)":
  //             {
  //               "text": "My sibling(s) annoyed me today and I am very mad at them...", nextQuestion: {
  //                 question: "Which sibling?",
  //                 options: {
  //                   "Brother": {
  //                     "text": "My brother annoyed me very much today",
  //                     nextQuestion: false
  //                   },
  //                   "Sister": {
  //                     "text": "My sister is very annoying and today was not an exception",
  //                     nextQuestion: false
  //                   }
  //                 }
  //               }
  //             },
  //             "Because of some failure": { "text": "I failed my exams and I am very sad about it", nextQuestion: false }
  //           }
  //         }
  //       }
  //     },
  //   },
  //   {
  //     id: 2,
  //     question: "How was your night?",
  //     options:{
  //       "Good":{
  //         "text": "It was good",
  //         nextQuestion: false
  //       }
  //     }
  //   }

  // ];

  const [questions, setQuestions] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentOption, setCurrentOption] = useState();
  const [animationIndex, setAnimationIndex] = useState(0);
  const [end, setEnd] = useState(false);
  const [diaryText, setDiaryText] = useState("");
  const [extraText, setExtraText] = useState("");
  const [isVisible, setIsVisible] = useState(true)
  const text = document.getElementById("diarytext")


  // sleep function
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(() => {
    const getQuestions_ = async () => {
      const q_ = await getQuestions()
      setQuestions(q_)
      setCurrentQuestion(q_[0])
      console.log(q_)
    }
    getQuestions_()
  }, [])



  const appendText = (option) => {
    setExtraText(" " +option.text);
    setCurrentOption(option)
    console.log(option)
  }

  const nextQuestion = ()=>{
    setCurrentQuestionIndex(currentQuestionIndex+1)
    if (!(questions[currentQuestionIndex+1])){
      setEnd(true)
      return
    }
    setCurrentQuestion(questions[currentQuestionIndex+1]);
  }


  const submit = async () => {
    if (!extraText){nextQuestion(); return}
    setDiaryText(diaryText + extraText)
    setExtraText("")
    setIsVisible(false)
    const t1 = Date.now()
    if (currentQuestionIndex < questions.length) {
      setAnimationIndex(animationIndex+1)
      if (currentOption.next_question.length){
        for (let index = 0; index < currentOption.next_question.length; index++) {
          const nq = await getQuestion(currentOption.next_question[index])
          setCurrentQuestion(nq)
        }
      }
      else{
        nextQuestion()
      }
      
    } else {
      setEnd(true)
    }
    const t2 = Date.now()
    await sleep(3000-(t2-t1))
    setIsVisible(true)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className="container">
        {end ? <EndPage diaryText_={diaryText}/> :
          <>
          
          <motion.div
          // animate this div so that it fades into existance
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 4 }}
          transition={{ duration: 3 }}
          key={animationIndex}
          >
            <div className="text-center mt-4">
              <h3>{currentQuestion && currentQuestion?.title}</h3>
              <p className="diary-text">{diaryText} <b>{extraText}</b> </p>
            </div>
          </motion.div>
            
            <div className="text-center">
            <AnimatePresence>
              {isVisible &&  <motion.div
          // animate this div so that it fades into existance
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2 } }}
          transition={{duration: 3}}
          key={animationIndex}
          >
            <div className="row my-5">
                {currentQuestion && (currentQuestion?.options)?.map((option, index) => {
                  return (
                    <div key={index} className="col-md-6 col-6 justify-content-center align-items-center d-flex" >
                      <a className="btn btn-outline-primary btn-option d-flex justify-content-center align-items-center" onClick={() => appendText(option)}>
                        <span className="text-center">
                          {option.title}
                        </span>
                      </a>
                    </div>)
                })}
              </div>
              <a className="btn btn-success" onClick={submit}>
                {extraText ? "Submit" : "Skip"}
              </a>
          </motion.div>}
           
            </AnimatePresence>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Questions