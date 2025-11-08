import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header';
import TicketForm from '../TicketForm';
import TicketList from '../TicketList';
import { getTickets, createTicket, updateTicket, deleteTicket, getUserTickets } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('all');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, [activeView]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      let response;
      
      if (activeView === 'my-tickets') {
        response = await getUserTickets();
      } else {
        response = await getTickets();
      }
      
      setTickets(response.data);
      setError('');
    } catch (err) {
    //   setError('Failed to fetch tickets. Please check if the server is running.');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      setLoading(true);
      await createTicket(ticketData);
      await fetchTickets();
      setError('');
    } catch (err) {
      setError('Failed to create ticket.');
      console.error('Error creating ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTicket = async (ticketData) => {
    try {
      setLoading(true);
      await updateTicket(editingTicket._id, ticketData);
      setEditingTicket(null);
      await fetchTickets();
      setError('');
    } catch (err) {
      setError('Failed to update ticket.');
      console.error('Error updating ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        setLoading(true);
        await deleteTicket(ticketId);
        await fetchTickets();
        setError('');
      } catch (err) {
        setError('Failed to delete ticket.');
        console.error('Error deleting ticket:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleCancelEdit = () => {
    setEditingTicket(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="container">
        <div className="dashboard-header">
          <div className="user-welcome">
            <h2>Welcome back, {user?.name|| 'User'}!</h2>
            {/* <p>
              Logged in as: <strong>{user?.email}</strong>
              {user?.name && user.name !== user.email && ` (${user.name})`}
            </p> */}
          </div>
          
          <div className="view-controls">
            <button
              className={`view-btn ${activeView === 'all' ? 'active' : ''}`}
              onClick={() => setActiveView('all')}
            >
              All Tickets
            </button>
            <button
              className={`view-btn ${activeView === 'my-tickets' ? 'active' : ''}`}
              onClick={() => setActiveView('my-tickets')}
            >
              My Tickets
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="main-content">
          <div className="form-section">
            <TicketForm
              onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
              editingTicket={editingTicket}
              onCancel={handleCancelEdit}
              loading={loading}
            />
          </div>
          
          <div className="list-section">
            <TicketList
              tickets={tickets}
              onEdit={handleEditTicket}
              onDelete={handleDeleteTicket}
              loading={loading}
              currentUserId={user?._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;