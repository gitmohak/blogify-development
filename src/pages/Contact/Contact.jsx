//Contact Page of the website
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import "./contact.css";
import ContactForm from './ContactForm';

function Contact() {
    const [resultText, setresultText] = useState({
        title: "Please Wait",
        description: "Your message is being delivered."
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    return (
        <section id="myContact" className='contact container d-flex flex-wrap justify-content-around'>
            
            <ContactForm setresultText={setresultText} />

            {/* Modal with useful information to show when someone submits the form */}
            <div className="modal fade" data-bs-backdrop="static" id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="formModalLabel">{parse(resultText.title)}</h1>
                            <button type="button" className={`btn-close`} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            {parse(resultText.description)}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact