import React from 'react';
import TicketItem from './TicketItem';
import './TicketList.css';

const TicketList = ({ tickets, onEdit, onDelete, loading, currentUserId }) => {
  if (loading) {
    return (
      <div className="ticket-list">
        <h2>All Tickets</h2>
        <div className="loading">Loading tickets...</div>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      <div className="ticket-list-header">
        <h2>All Tickets ({tickets.length})</h2>
      </div>
      
      {tickets.length === 0 ? (
        <div className="no-tickets">
          No tickets found. Create your first ticket above!
        </div>
      ) : (
        <div className="tickets-container">
          {tickets.map(ticket => (
            <TicketItem
              key={ticket._id}
              ticket={ticket}
              onEdit={onEdit}
              onDelete={onDelete}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;