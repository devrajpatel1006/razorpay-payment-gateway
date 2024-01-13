import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import "./OrderList.css";

export const OrderList = () => {
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(759.5);
  const [deliveryFee, setdeliveryFee] = useState(12);
  const [taxes, setTaxes] = useState(46.15);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const order = [
    {
      name: "Margarita A",
      id: 2,
      price: 412.0,
      ingredients: "crab & cucumber",
    },
    {
      name: "Margarita B",
      id: 1,
      price: 112.0,
      ingredients: "tuna & cucumber",
    },
    {
      name: "Margarita C",
      id: 3,
      price: 1236.0,
      ingredients:
        "smoked salmon over rice with extra sauce to check if this line works",
    },
  ];

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < order.length; i++) {
      sum += order[i].price;
    }
    setTotal(sum);
  });

  const initPayment = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: data.amount - discount + (deliveryFee + taxes),
      currency: data.currency,
      description: "Test Order",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl =
            import.meta.env.VITE_BASE_API_URL + "/api/payment/verify";
          const { data1 } = await axios.post(verifyUrl, response);
          if (response.razorpay_order_id) {
            setOrderDetails({
              orderId: response.razorpay_order_id,
              totalAmount: data.amount / import.meta.env.VITE_CURRENCY_PRICE,
            });
            setShowModal(true);
          }
        } catch (error) {
          console.log(error);
        }
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_BASE_API_URL + "/api/payment/orders",
        {
          amount: total - discount + (deliveryFee + taxes),
        }
      );
      initPayment(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="OrderListParent">
      <div className="delPickupBox">
        <h2>TSX PIZZERIAS</h2>
        <div className="delpubox">
          <span className="delivery">DELIVERY</span>
          <span className="pu">PICK UP</span>
        </div>
        <div className="otherDetails">
          <span>25 mins</span>
          <span>₹20</span>
          <span>Discounts</span>
        </div>
        <div className="otherDetails2">Menu Hours: 10:00 AM to 11:00 PM</div>
      </div>
      <div className="heading">
        <h2>Your Order</h2>
        <h3>Add items +</h3>
      </div>
      <div>
        {order.map((dish) => {
          return (
            <div key={dish.id} className="dish">
              <div className="b1">
                <h3 className="id">{dish.id}</h3>
                <div>
                  <h3>{dish.name}</h3>
                  <p className="ingred">{dish.ingredients}</p>
                </div>
              </div>
              <div className="b2">
                <h3>₹{dish.price}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="summary_Cont">
        <div className="summary">
          <h2>Summary</h2>
        </div>
        <div className="totalContList">
          <div className="totalContListItem">
            <h3>Subtotal</h3>
            <h3>₹{total}</h3>
          </div>
          <div className="totalContListItem discount">
            <h3>Discount</h3>
            <h3>-₹{discount.toFixed(2)}</h3>
          </div>
          <div className="totalContListItem">
            <h3>Delivery Fee</h3>
            <h3>₹{deliveryFee}</h3>
          </div>
          <div className="totalContListItem">
            <h3>Taxes</h3>
            <h3>₹{taxes}</h3>
          </div>
          <div className="totalContListItem totalContListItemTotal">
            <h3>Total</h3>
            <h3>₹1058.65</h3>
          </div>

          <button className="placeOrderBtn" onClick={handleSubmit}>
            {loading ? <Loader /> : "PLACE ORDER"}
          </button>
          {showModal && (
            <Modal handleClose={closeModal} orderDetails={orderDetails} />
          )}
        </div>
      </div>
    </div>
  );
};
