import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../AuthProvider';
import Input from './Input';
import Button from './Button';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#2f3136',
  },
};

const SettingsModal = ({ onClose }) => {
  const { t } = useTranslation();
  const user = useAuthContext();
  const [values, setValues] = React.useState({
    bio: user.bio,
    displayName: user.displayName,
    profileImg: user.profileImg,
  });

  const [canSubmit, setCanSubmit] = React.useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const checkSubmit = () => {
    if (
      values.bio === user.bio &&
      values.displayName === user.displayName &&
      values.profileImg === user.profileImg
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Modal
        preventScroll
        isOpen
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Settings"
      >
        <div className="p-5 w-full h-full">
          <p className="mb-5 text-sm text-white">{t('settings.settings')}</p>
          <form>
            <label className="mb-5 text-xs text-white" htmlFor="displayName">
              {t('settings.displayName')}
            </label>
            <Input
              id="displayName"
              name="displayName"
              type="text"
              className="my-2"
              value={values.displayName}
              onChange={handleChange}
              placeholder={t('settings.displayName')}
            />
            <label className="mb-5 text-xs text-white" htmlFor="profileImg">
              {t('settings.profileImg')}
            </label>
            <Input
              id="profileImg"
              name="profileImg"
              type="text"
              className="my-2"
              value={values.profileImg}
              onChange={handleChange}
              placeholder={t('settings.profileImg')}
            />
            <label className="mb-5 text-xs text-white" htmlFor="bio">
              {t('settings.bio')}
            </label>
            <Input
              id="bio"
              name="bio"
              type="text"
              textarea
              className="mt-2"
              value={values.bio}
              onChange={handleChange}
              placeholder={t('settings.bio')}
            />
            <div className="flex w-full justify-center items-center">
              <Button disabled={checkSubmit()} extraClassName="mt-3 w-1/2">
                {t('settings.save')}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SettingsModal;
