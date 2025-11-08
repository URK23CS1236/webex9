import React from 'react';
import './TicketItem.css';

const TicketItem = ({ ticket, onEdit, onDelete, currentUserId }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Low':
        return 'priority-low';
      case 'Medium':
        return 'priority-medium';
      case 'High':
        return 'priority-high';
      case 'Critical':
        return 'priority-critical';
      default:
        return 'priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Open':
        return 'status-open';
      case 'In Progress':
        return 'status-in-progress';
      case 'Resolved':
        return 'status-resolved';
      case 'Closed':
        return 'status-closed';
      default:
        return 'status-open';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOwner = ticket.createdBy?._id === currentUserId;

  return (
    <div className="ticket-item">
      <div className="ticket-header">
        <h3 className="ticket-title">{ticket.title}</h3>
        <div className="ticket-meta">
          <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
            {ticket.priority}
          </span>
          <span className={`status-badge ${getStatusClass(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>
      </div>
      
      <div className="ticket-category">
        <strong>Category:</strong> {ticket.category}
        {ticket.createdBy && (
          <span className="ticket-owner">
            • Created by: {ticket.createdBy.name}
            {isOwner && ' (You)'}
          </span>
        )}
      </div>
      
      <div className="ticket-description">
        {ticket.description}
      </div>
      
      <div className="ticket-footer">
        <div className="ticket-date">
          Created: {formatDate(ticket.createdAt)}
        </div>
        <div className="ticket-actions">
          {(isOwner || !ticket.createdBy) && (
            <button
              onClick={() => onEdit(ticket)}
              className="btn btn-edit"
            >
              Edit
            </button>
          )}
          {(isOwner || !ticket.createdBy) && (
            <button
              onClick={() => onDelete(ticket._id)}
              className="btn btn-delete"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketItem;