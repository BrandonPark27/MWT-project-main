import React, { useState } from "react";
import "../css/Payment.css";

function Payment() {
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");

    const handlePayment = (e) => {
        e.preventDefault();
        alert(`Payment processed for card: ${cardNumber}`);
    };

    return (
        <>
        
            <div className="payment-container">

                <form className="payment-form" onSubmit={handlePayment}>
                    <h2>Payment Information</h2>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expirationDate">Expiration Date:</label>
                        <input
                            type="text"
                            id="expirationDate"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="payment-button">
                        Pay Now
                    </button>
                </form>
            </div>
        </>
    );
}

export default Payment;
