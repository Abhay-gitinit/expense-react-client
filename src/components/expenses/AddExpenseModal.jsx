import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../../config/appConfig";

function AddExpenseModal({ groupId, members = [], onClose, onExpenseAdded }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");
  const [participants, setParticipants] = useState([]);
  const [splits, setSplits] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleParticipant = (email) => {
    setParticipants((prev) =>
      prev.includes(email) ? prev.filter((p) => p !== email) : [...prev, email],
    );
  };

  const updateSplit = (email, value) => {
    setSplits((prev) => {
      const others = prev.filter((s) => s.email !== email);
      return [...others, { email, value: Number(value) }];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!participants.length) {
      alert("Please select at least one participant");
      return;
    }

    if (!participants.includes(paidBy)) {
      alert("Paid by must be included in participants");
      return;
    }

    const payload = {
      groupId,
      description,
      amount: Number(amount),
      paidBy,
      splitType,
      participants,
      splits: splitType === "EQUAL" ? [] : splits,
    };

    try {
      setLoading(true);

      await axios.post(`${serverEndpoint}/expenses`, payload, {
        withCredentials: true,
      });

      onExpenseAdded();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-overlay">
      <div className="expense-modal">
        <div className="expense-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Expense</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Paid by</label>
                <select
                  className="form-select"
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  required
                >
                  <option value="">Select payer</option>
                  {members.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Participants</label>
                {members.map((m) => (
                  <div key={m} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={participants.includes(m)}
                      onChange={() => toggleParticipant(m)}
                    />
                    <label className="form-check-label">{m}</label>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <label className="form-label">Split type</label>
                <select
                  className="form-select"
                  value={splitType}
                  onChange={(e) => setSplitType(e.target.value)}
                >
                  <option value="EQUAL">Equal</option>
                  <option value="EXACT">Exact</option>
                  <option value="PERCENT">Percent</option>
                  <option value="SHARE">Share</option>
                </select>
              </div>

              {splitType !== "EQUAL" &&
                participants.map((p) => (
                  <div key={p} className="mb-2 d-flex gap-2">
                    <span className="flex-grow-1">{p}</span>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => updateSplit(p, e.target.value)}
                      required
                    />
                  </div>
                ))}
            </div>

            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExpenseModal;