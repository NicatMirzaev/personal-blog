import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
  },
};

const ErrorModal = ({ error, onClose }) => (
  <div>
    <Modal preventScroll isOpen onRequestClose={onClose} style={customStyles} contentLabel="Error">
      <div className="p-5 w-full h-full">
        <p className="text-md font-bold text-red-500">{error}</p>
      </div>
    </Modal>
  </div>
);

ErrorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default ErrorModal;
