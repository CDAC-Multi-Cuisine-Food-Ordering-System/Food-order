import React from 'react'
import { MdEmail, MdOutlinePhoneIphone } from 'react-icons/md'

const ContactUs = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '70%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '420px',
        background: 'url("../images/bg_img.jpg") no-repeat',
        border: '2px solid rgba(255, 255, 255, .2)',
        backdropFilter: 'blur(30px)',
        boxShadow: '0 0 10px rgba(255, 255, 0, .2)',
        color: '#fff',
        borderRadius: '10px',
        padding: '30px 40px',
      }}
    >
      <form action="">
        <h1>Contact Us</h1>

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            margin: '20px 0',
          }}
        >
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Enter your first name"
            required
            style={{
              width: '100%',
              height: '40px',
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, .2)',
              borderRadius: '40px',
              fontSize: '16px',
              color: '#fff',
              padding: '0 20px',
              marginTop: '5px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            margin: '20px 0',
          }}
        >
          <input
            type="text"
            id="last"
            name="last"
            placeholder="Enter your last name"
            required
            style={{
              width: '100%',
              height: '40px',
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, .2)',
              borderRadius: '40px',
              fontSize: '16px',
              color: '#fff',
              padding: '0 20px',
              marginTop: '5px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            margin: '20px 0',
          }}
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            style={{
              width: '100%',
              height: '40px',
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, .2)',
              borderRadius: '40px',
              fontSize: '16px',
              color: '#fff',
              padding: '0 20px',
              marginTop: '5px',
              boxSizing: 'border-box',
            }}
          />
          <MdEmail
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            margin: '20px 0',
          }}
        >
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here..."
            style={{
              width: '100%',
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, .2)',
              borderRadius: '10px',
              fontSize: '16px',
              color: '#fff',
              padding: '10px',
              marginTop: '5px',
              boxSizing: 'border-box',
              height: '170px',
            }}
            required
          ></textarea>
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            margin: '20px 0',
          }}
        >
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Enter your Mobile Number"
            required
            maxLength="10"
            style={{
              width: '100%',
              height: '40px',
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, .2)',
              borderRadius: '40px',
              fontSize: '16px',
              color: '#fff',
              padding: '0 20px',
              marginTop: '5px',
              boxSizing: 'border-box',
            }}
          />
          <MdOutlinePhoneIphone
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            height: '45px',
            background: '#fff',
            border: 'none',
            borderRadius: '40px',
            boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#333',
            fontWeight: '700',
            marginTop: '20px',
          }}
        >
          Submit
        </button>

        <div
          style={{ fontSize: '14.5px', textAlign: 'center', marginTop: '20px' }}
        >
          {/* <p>
            Already have an account?{" "}
            <a
              href="/user/login"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login
            </a>
          </p> */}
        </div>
      </form>
    </div>
  )
}

export default ContactUs
