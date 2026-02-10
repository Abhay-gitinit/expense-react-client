import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../../config/appConfig";

function PayModal({ settlement, groupId, onClose, onSuccess }) {
  const [amount, setAmount] = useState(settlement.amount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    try {
      setLoading(true);
      setError("");

      // 1️⃣ Create Razorpay order
      const orderRes = await axios.post(
        `${serverEndpoint}/payments/create-order`,
        { amount: Number(amount) },
        { withCredentials: true }
      );

      const order = orderRes.data;

      // 2️⃣ Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Expense Split App",
        description: `Settlement with ${settlement.to}`,
        order_id: order.id,

        handler: async function (response) {
          try {
            // 3️⃣ Verify payment & create settlement expense
            await axios.post(
              `${serverEndpoint}/payments/verify`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                groupId,
                from: settlement.from,
                to: settlement.to,
                amount: Number(amount),
              },
              { withCredentials: true }
            );

            onSuccess(); // refresh balances
            onClose();
          } catch (err) {
            setError("Payment verification failed");
          }
        },

        prefill: {
          email: settlement.from,
        },

        theme: {
          color: "#6f42c1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-overlay">
      <div className="expense-modal">
        <div className="expense-content">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Pay</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* Body */}
          <p className="text-muted mb-3">
            Paying <strong>{settlement.to}</strong>
          </p>

          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              min={1}
              max={settlement.amount}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {error && <p className="text-danger small mt-2">{error}</p>}

          {/* Footer */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${amount}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayModal;
