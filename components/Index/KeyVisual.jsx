import React, { useState }  from 'react'
import { useRouter } from "next/router";
import Button from '../Button';
import Script from 'next/script';
import Explaination from './Explaination';


function KeyVisual() {
    const router = useRouter()
    const [quizStage, setQuizStage] = useState(5)
    const [selectedProblem, setSelectedProblem] = useState("")

  return (
        <>
            <div className='min-h-screen justify-center flex flex-col items-center space-y-8 px-8'>
          {
            quizStage == 1 ? <>
            <h1 className='text-4xl font-bold'>Do you want to learn to get fluent in a foreign language with music?</h1>
            <div className='flex space-x-8 text-2xl'>
              <div className='w-36 h-36 md:w-48 md:h-48 flex justify-center items-center bg-slate-800 text-white rounded-xl hover:cursor-pointer'><p>No</p></div>
              <div className='w-36 h-36 md:w-48 md:h-48 flex justify-center items-center bg-slate-800 rounded-xl text-white hover:cursor-pointer' onClick={() => {
                setQuizStage((prev) => prev + 1)
              }}><p>Yes</p></div>
            </div>
            </>: <></>
          }
          {
            quizStage == 2 ? <>
            <h1 className='text-4xl font-bold'>Why are you learning the language?</h1>
            <div className='flex flex-wrap text-2xl justify-around w-[100%] md:px-48 px-8'>
              <div className='mb-8 md:mb-0 h-24 w-24 md:h-48 md:w-48 flex justify-center items-center bg-slate-800 text-white rounded-xl hover:cursor-pointer' onClick={() => {
                setQuizStage((prev) => prev + 1)
              }}><p>Family</p></div>
              <div className='h-24 w-24 md:h-48 md:w-48 flex justify-center items-center bg-slate-800 text-white rounded-xl hover:cursor-pointer' onClick={() => {
                setQuizStage((prev) => prev + 1)
              }}><p>Culture</p></div>
              <div className='h-24 w-24 md:h-48 md:w-48 flex justify-center items-center bg-slate-800 text-white rounded-xl hover:cursor-pointer' onClick={() => {
                setQuizStage((prev) => prev + 1)
              }}><p>Work</p></div>
              <div className='h-24 w-24 md:h-48 md:w-48 flex justify-center items-center bg-slate-800 rounded-xl text-white hover:cursor-pointer' onClick={() => {
                setQuizStage((prev) => prev + 1)
              }}><p>Other </p></div>
            </div>
            </>: <></>
          }
          {
            quizStage == 3 ? <>
            <h1 className='text-4xl font-bold' >Do you know the basis grammar of the language?</h1>
            <h2>Basic grammar includes: Personal pronouns (<b>I, You, He She It ...</b>) and tenses (<b>Past, Present and future</b>)</h2>
            <div className='flex space-x-8 text-2xl'>
              
              <div className='w-36 h-36 md:w-48 md:h-48 flex justify-center items-center bg-slate-800 text-white rounded-xl hover:cursor-pointer' onClick={() => {
                setQuizStage((prev) => prev + 1)
              }}><p>No</p></div>
              <div className='w-36 h-36 md:w-48 md:h-48 flex justify-center items-center bg-slate-800 rounded-xl text-white hover:cursor-pointer' onClick={() => {
                setQuizStage((prev) => prev + 1)
              }}><p>Yes</p></div>
            </div>
            </>: <></>
          }
          {
            quizStage == 4 ? <>
            <h1 className='text-4xl font-bold' >What problem do you have learning the language?</h1>
            <div className='flex flex-wrap text-2xl justify-around w-[100%] md:px-48'>   
              <div className='w-36 h-36 flex justify-center items-center bg-slate-800 text-white rounded-xl hover:cursor-pointer mb-8' onClick={() => {
                setQuizStage((prev) => prev + 1)
                setSelectedProblem("vocabulary")
              }}><p>Vocabulary</p></div>
              <div className='w-36 h-36 flex justify-center items-center bg-slate-800 rounded-xl text-white hover:cursor-pointer' onClick={() => {
                setQuizStage((prev) => prev + 1)
                setSelectedProblem("grammar")
              }}><p>Grammar</p></div>
              <div className='w-36 h-36 flex justify-center items-center bg-slate-800 rounded-xl text-white hover:cursor-pointer' onClick={() => {
                setQuizStage((prev) => prev + 1)
                setSelectedProblem("expressing")
              }}><p className="px-4 text-center">Expressing yourself</p></div>
            </div>
            </>: <></>
          }
          { 
            quizStage == 5 ? <>
            <h1 className='text-4xl font-bold mt-24' >Starte jetzt Lyrics in einer anderen Sprache zu verstehen!</h1>
            <div class="ml-embedded" data-form="NViGyf"></div>
            <Script>{`
    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '370238');`}
</Script>  
<Explaination />
            </>: <></>

          }         

        </div>
  
        </>
  )
}

export default KeyVisual