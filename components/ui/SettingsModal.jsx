import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuthContext, useAuth } from '../AuthProvider';
import { makeRequest } from '../../lib/helpers';
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

const SettingsModal = ({ userData, onClose }) => {
  const { t } = useTranslation();
  const user = useAuthContext();
  const dispatch = useAuth();
  const [data, setData] = React.useState({ error: '', loading: false });
  const [values, setValues] = React.useState({
    bio: userData.bio,
    displayName: userData.displayName,
    profileImg: userData.profileImg,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const checkSubmit = () => {
    if (
      values.bio === userData.bio &&
      values.displayName === userData.displayName &&
      values.profileImg === userData.profileImg &&
      data.loading === false
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (user.data?.moderator === true || user.data?._id === userData._id) {
      setData({ error: '', loading: true });
      const data = {
        userId: userData._id,
        bio: values.bio,
        displayName: values.displayName,
        profileImg: values.profileImg,
      };
      makeRequest('/users/update', 'POST', JSON.stringify(data)).then((res) => {
        if (res.errorCode === undefined) {
          if (res._id === user._id) {
            dispatch({
              type: 'SET_USER',
              payload: { loading: false, data: res },
            });
          }
          setData({ error: '', loading: false, success: true });
        } else {
          setData({ error: t(`errorCodes.${res.errorCode}`), loading: false });
        }
      });
    }
  };

  const showMessage = () => {
    if (data.error.length > 0) {
      return <p className="text-xs text-red-500 my-2">{data.error}</p>;
    } else if (data.success === true) {
      return (
        <p className="text-xs text-green-500 my-2">
          {t('settings.saveSuccess')}
        </p>
      );
    }
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
              maxLength="50"
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
              maxLength="300"
              value={values.bio}
              onChange={handleChange}
              placeholder={t('settings.bio')}
            />
            {showMessage()}
            <div className="flex w-full justify-center items-center">
              <Button
                onClick={handleSubmit}
                disabled={checkSubmit()}
                loading={data.loading}
                extraClassName="mt-3 w-1/2"
              >
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
