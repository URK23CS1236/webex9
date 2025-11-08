import React, { useState, useEffect } from 'react';
import './TicketForm.css';

const TicketForm = ({ onSubmit, editingTicket, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical',
    priority: 'Medium',
    status: 'Open'
  });

  useEffect(() => {
    if (editingTicket) {
      setFormData({
        title: editingTicket.title,
        description: editingTicket.description,
        category: editingTicket.category,
        priority: editingTicket.priority,
        status: editingTicket.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Technical',
        priority: 'Medium',
        status: 'Open'
      });
    }
  }, [editingTicket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onSubmit(formData);
      if (!editingTicket) {
        setFormData({
          title: '',
          description: '',
          category: 'Technical',
          priority: 'Medium',
          status: 'Open'
        });
      }
    }
  };

  return (
    <div className="ticket-form">
      <h2>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter ticket title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe the issue in detail"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="General">General</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Bug Report">Bug Report</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        {editingTicket && (
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          {editingTicket && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !formData.title.trim() || !formData.description.trim()}
          >
            {loading ? 'Processing...' : (editingTicket ? 'Update Ticket' : 'Create Ticket')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;  