import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import GoogleIcon from '../icons/Google';
import TwitterIcon from '../icons/Twitter';
import GithubIcon from '../icons/Github';
import { API_URL } from '../../lib/config';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const LoginModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        preventScroll
        isOpen
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Sign in"
      >
        <div className="flex flex-col w-full sm:p-5 p-2 items-center justify-center">
          <p className="mb-5 text-sm font-bold">{t('navbar.signIn')}</p>
          <Button
            link={`${API_URL}/auth/google`}
            color="secondary"
            extraClassName="mb-4 text-base w-full"
          >
            <GoogleIcon className="mr-2" width={20} height={20} />
            {t('signIn.withGoogle')}
          </Button>
          <Button
            link={`${API_URL}/auth/twitter`}
            color="secondary"
            extraClassName="mb-4 text-base w-full"
          >
            <TwitterIcon className="mr-2" width={20} height={20} />
            {t('signIn.withTwitter')}
          </Button>
          <Button
            link={`${API_URL}/auth/github`}
            color="secondary"
            extraClassName="mb-4 text-base w-full"
          >
            <GithubIcon className="mr-2" width={20} height={20} />
            {t('signIn.withGithub')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
