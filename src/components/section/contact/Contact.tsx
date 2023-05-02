import React from "react";
import "./contact.scss";

export const Contact = () => {
  return (
    <section>
      <div className="contact">
        <div className="contact__container">
          <h1 className="contact__container__header">Contact Us</h1>
        </div>
       
        <div className="contact__rapidMessageContainer">
        
          <form className="contact__rapidMessageContainer__form" action="">
            <input
              className="contact__rapidMessageContainer__form__input"
              type="text"
              placeholder="Name"
            />
            <input
              className="contact__rapidMessageContainer__form__input"
              type="text"
              placeholder="E-post"
            />
            <input
              className="contact__rapidMessageContainer__form__input"
              type="text"
              placeholder="Phone"
            />
            <input
              className="contact__rapidMessageContainer__form__bigMessage"
              type="text"
              placeholder="Message"
            />
            <button className="contact__rapidMessageContainer__form__btn">
            Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
