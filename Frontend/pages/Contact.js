import React, { useState } from 'react'; // Added useState import
import styles from './Contact.module.css'; // Importing CSS module
import axios from 'axios';
import SidebarContact from '../components/SidebarContact'; // Import SidebarContact
import '../App.css';

const ContactUs = () => { // Changed component name for clarity
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formResponseMessage, setFormResponseMessage] = useState('');

  const handleContactChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5006/api/contact/submit', contactFormData);
      
      setFormResponseMessage(res.data.message);
      setContactFormData({ name: '', email: '', message: '' }); // Clear the form
    } catch (error) {
      setFormResponseMessage('There was an error sending your message.');
    }
  };

  return (
    <div className={styles.contactDashboardContainer}> {/* Updated class name with CSS module */}
      <SidebarContact /> {/* Use SidebarContact here */}
      <div className={styles.contactDashboardContent}> {/* Updated class name with CSS module */}
        <header className={styles.contactDashboardHeader}>
          <h1>Contact Us</h1>
        </header>
        <p className={styles.contactWelcomeMessage}>We're here to help you with any inquiries, concerns, or feedback.</p>
        <div className={styles.contactFormContainer}> {/* Updated class name with CSS module */}
          <h2 className={styles.contactFormHeader}>Send Us a Message</h2>
          {formResponseMessage && <p className={styles.contactResponseMessage}>{formResponseMessage}</p>}
          <div className={styles.formBox}> {/* Added formBox for styling */}
            <form onSubmit={handleContactSubmit} className={styles.contactForm}> {/* Updated class name with CSS module */}
              <div className={styles.formGroupContact}> {/* Updated class name with CSS module */}
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactFormData.name}
                  onChange={handleContactChange}
                  placeholder="Your Name"
                  required
                  className={styles.contactInput} // Updated class name with CSS module
                />
              </div>

              <div className={styles.formGroupContact}> {/* Updated class name with CSS module */}
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactFormData.email}
                  onChange={handleContactChange}
                  placeholder="Your Email"
                  required
                  className={styles.contactInput} // Updated class name with CSS module
                />
              </div>

              <div className={styles.formGroupContact}> {/* Updated class name with CSS module */}
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactFormData.message}
                  onChange={handleContactChange}
                  rows="5"
                  placeholder="Your Message"
                  required
                  className={styles.contactTextarea} // Updated class name with CSS module
                ></textarea>
              </div>

              <button type="submit" className={styles.contactSubmitButton}>Submit</button> {/* Updated class name with CSS module */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
