import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function Faq() {
 const [faqData, setFaqData] = useState([]);
 const [answer, setAnswer] = useState('');
 const socketRef = useRef();

 useEffect(() => {
  socketRef.current = io('http://localhost:8000/ws/faq/faqs/');
  console.log('Connected to the server');
  socketRef.current.on('answer', (data) => {
    setAnswer(data.answer);
   console.log(data.answer)
   
  });
 
  fetch('http://localhost:8000/api/faqs/api/faqs')
    .then(response => response.json())
    .then(data => setFaqData(data));
 }, []);


 const handleQuestionClick = (id) => {
   if (socketRef.current) {
    console.log(id)
     socketRef.current.emit('answer', { id });
   }
 };
 return (

    <div className="container" style={styles.container}>
      
      <div className="accordion w-100" id="basicAccordion">
        {faqData.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index + 1}`}>
              <button className="accordion-button collapsed" type="button" data-mdb-toggle="collapse"
                data-mdb-target={`#basicAccordionCollapse${index + 1}`} aria-expanded="false" aria-controls={`collapse${index + 1}`}
                onClick={() => handleQuestionClick(faq.id)}>
                {faq.question}
              </button>
            </h2>
            <div id={`basicAccordionCollapse${index + 1}`} className="accordion-collapse collapse" aria-labelledby={`heading${index + 1}`}
              data-mdb-parent="#basicAccordion" >
              <div className="accordion-body">
                <strong>{answer}anabbjabkjdbkakjfj</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   );
}
const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    background: '#E8E8E8',
    marginTop: '30px',
    marginBottom: '30px',
  },
 };
export default Faq;