import { useRef } from "react";
import "./contact.css";
import emailjs from '@emailjs/browser';

function ContactForm({setresultText}) {
    const contactForm = useRef();
    const modalRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        modalRef.current.click();

        setresultText({
            title: "Please Wait",
            description: "Your message is being delivered."
        });

        // EmailJS to send the information to my Email ID.
        emailjs.sendForm('service_0wcmgnv', 'template_ulzc5a7', contactForm.current, 'O0wEfR0CHzgJz00pr')
            .then(() => {
                setresultText({
                    title: "<span className='text-success'>SUCCESS</span>",
                    description: "<span className='text-success fw-bold'>Your message has been delivered. I will respond back shortly.</span>"
                });

            }, (error) => {
                setresultText({
                    title: "<span className='text-danger'>ERROR</span>",
                    description: `<span className='text-danger fw-bold'>A problem has occurred while sending your message - </span>${error.text}`
                });
            });

        event.target.reset();
    }

    return (
        <>
            <h1 className={`w-100 mb-2 text-center fw-bold text-success contact-heading`}>Contact me</h1>
            <img src="/images/contactTall.png" alt="Contact Us with message" />

            {/* Contact Form with required useful information */}
            <form ref={contactForm}

                onSubmit={(event) =>
                    handleSubmit(event)
                } method='post'>

                {/* Name input with form validation */}
                <div className="mb-3">
                    <label htmlFor="senderName" className="form-label fst-italic fw-bold fs-5">Name</label>

                    <input type="text" name="sender_name" className="form-control" id="senderName" aria-describedby="nameHelp" required minLength={5} maxLength={70} pattern='[a-zA-Z\s]+' title="Only Alphabets and Spaces" autoFocus />
                </div>

                {/* Email address input with form validation */}
                <div className="mb-3">
                    <label htmlFor="senderEmail" className="form-label fst-italic fw-bold fs-5">Email address</label>
                    <input type="email" name="sender_email" className="form-control" id="senderEmail" aria-describedby="emailHelp" required minLength={5} maxLength={100} />
                </div>

                {/* Subject input with form validation */}
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label fst-italic fw-bold fs-5">Subject</label>
                    <input type="text" name="subject" className="form-control" id="subject" aria-describedby="subjectHelp" required minLength={5} maxLength={150} />
                </div>

                {/* Message input with form validation */}
                <div className="mb-3">
                    <label htmlFor="sender-msg" className="form-label fst-italic fw-bold fs-5">Message</label>
                    <textarea className="form-control" name="message" id="sender-msg" aria-describedby="messageHelp" required minLength={10} rows={6} maxLength={5000} />
                </div>

                {/* Submit button */}
                <button className="btn btn-lg btn-primary fs-3" type="submit">
                    Submit
                </button>
                <button hidden ref={modalRef} data-bs-toggle="modal" data-bs-target="#formModal"></button>
            </form>
        </>
    )
}

export default ContactForm