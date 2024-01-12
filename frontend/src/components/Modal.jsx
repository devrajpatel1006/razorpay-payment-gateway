import React from "react";

const Modal = ({ handleClose, orderDetails }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>Order has been placed successfully.</p>
        <p>Confirmation message sent!</p>

        <div className="order-details">
          <p><strong>Order Id:</strong> {orderDetails.orderId}</p>
          <p><strong>Total:</strong> ₹ {orderDetails.totalAmount}</p>
        </div>
        <button className="backButton" onClick={handleClose}>Back</button>
      </div>
    </div>
  );
};

export default Modal;
