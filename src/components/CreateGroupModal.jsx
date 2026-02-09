import axios from "axios";
import { useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import { useSelector } from "react-redux";

function CreateGroupModal({ show, onHide, onSuccess }) {
  const user = useSelector((state) => state.userDetails);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const validate = () => {
    const newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    if (formData.description.trim().length < 3) {
      newErrors.description = "Description must be at least 3 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverEndpoint}/groups/create`,
        {
          name: formData.name,
          description: formData.description,
        },
        { withCredentials: true },
      );

      const groupId = res.data.groupId;

      onSuccess({
        _id: groupId,
        name: formData.name,
        description: formData.description,
        adminEmail: user.email,
        membersEmail: [user.email],
        thumbnail: "",
      });

      onHide();
    } catch (err) {
      console.error(err);
      setErrors({
        message: "Unable to create group. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="members-modal-overlay" onClick={onHide}>
      <div className="create-group-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header border-0">
          <h5 className="mb-0">Create Group</h5>
          <button type="button" className="btn-close" onClick={onHide} />
        </div>

        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label small fw-bold">Group Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className={
                errors.name ? "form-control is-invalid" : "form-control"
              }
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={onChange}
              className={
                errors.description ? "form-control is-invalid" : "form-control"
              }
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          {errors.message && (
            <div className="text-danger small">{errors.message}</div>
          )}
        </div>

        <div className="modal-footer border-0 d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-light rounded-pill"
            onClick={onHide}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-primary rounded-pill"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupModal;