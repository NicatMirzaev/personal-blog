import { useTranslation } from 'react-i18next';
import Dropdown from 'react-dropdown';
import PropTypes from 'prop-types';
import GlobeIcon from '../icons/Globe';
import { Languages } from '../../lib/constants';
import { setValue } from '../../lib/store';

const LanguageSelector = ({ extraClassName }) => {
  const { i18n } = useTranslation();

  const onSelect = (option) => {
    const selected = Object.keys(Languages).find(
      (key) => Languages[key] === option.value,
    );
    i18n.changeLanguage(selected);
    setValue({ key: 'i18nextLng', value: selected });
  };
  return (
    <div className={`rounded-md items-center bg-dark ${extraClassName}`}>
      <GlobeIcon style={{ marginLeft: '8px', marginTop: '2px' }} fill="white" />
      <Dropdown
        options={Object.values(Languages)}
        onChange={onSelect}
        arrowClassName="top-5"
        value={Languages[i18n.language]}
      />
    </div>
  );
};

LanguageSelector.defaultProps = {
  extraClassName: '',
};

LanguageSelector.propTypes = {
  extraClassName: PropTypes.string,
};

export default LanguageSelector;
