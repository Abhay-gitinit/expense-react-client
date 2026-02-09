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

      await axios.post(
        `${serverEndpoint}/expenses/settle/${groupId}`,
        {
          from: settlement.from,
          to: settlement.to,
          amount: Number(amount),
        },
        { withCredentials: true },
      );

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
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
              {loading ? "Paying..." : `Pay ₹${amount}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayModal;