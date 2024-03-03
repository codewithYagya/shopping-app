// ToastNotification component for displaying toast notifications
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => {
  return (
    // Container for managing and displaying toast notifications
    <div>
      <ToastContainer />
    </div>
  );
}
export default ToastNotification;
