import axios from 'axios'


const BASE_URL = `http://localhost:8000`

const GET_QUESTIONS = `${BASE_URL}/questions/`
const GET_QUESTION = `${BASE_URL}/question/`


export const getQuestions = async () => {
    //get questions from backend
    const response = await axios.get(GET_QUESTIONS, {
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
        }
    })
    return response.data
}


export const getQuestion = async (id)=>{
    const question = await axios.get(GET_QUESTION+id+"/")
    return question.data
}