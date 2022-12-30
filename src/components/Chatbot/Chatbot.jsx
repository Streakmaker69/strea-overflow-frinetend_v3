import React, { useState } from 'react';
import {Configuration, OpenAIApi } from 'openai';
import { Cancel, Android} from '@material-ui/icons'

import './Chatbot.css';

function Chatbot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [userMessage, setUserMessage] = useState([])
  const [clicked, setClicked] = useState(false);

  const handleChange = (event) => {
    setInput(event.target.value);

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserMessage([{
      text: input,
      timestamp: Date.now()
    }])
   const configuration = new Configuration({
    apiKey: "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"
   });
    const openai = new OpenAIApi(configuration);

    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      temperature: 0.3,
      max_tokens: 512,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      n: 1,
    })
    setResponse(res.data.choices[0].text);
    setInput('');
  }


  return (
    <div className="chatbot-page">
      {!clicked ? (
        <div className="chatbot-icon">
          <Android onClick={() => setClicked(!clicked)} />
        </div>
        ) : (
          <div className="chatbot-chat">
            <div className="chatbot-header">
            <Cancel onClick={() => setClicked(!clicked)} className="chatbot-close" />
              <h1>Chat with Athena <Android className="chatbot-android" /></h1>
            </div>
            <div className="chatbot-user-chat">
              {
                userMessage.map((query) => (
                  <div className="chatbot-message" key={query.timestamp}>
                    <h3>User</h3>
                    <p>{query.text}</p>
                  </div>
                ))
              }
            </div>
            {response !== '' &&
              <div className="chatbot-response">
                  <h3>Athena</h3>
                  <p>{response}</p>
              </div>
            }
            <div className="chatbot-input">
              <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleChange} className="chatbot-input-form" />
                <input type="submit" value="Send" className="chatbot-send-btn"/>
              </form>
            </div>
          </div>
      )}


    </div>
  );
}

export default Chatbot;