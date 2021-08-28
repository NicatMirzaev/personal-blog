import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { makeRequest } from '../../lib/helpers';
const ContactPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState({ loading: false, error: '' });
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading({ loading: true, error: '' });
    const data = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };
    makeRequest('/contact', 'POST', JSON.stringify(data)).then((res) => {
      if (res.errorCode === undefined && res.success === true) {
        setLoading({ loading: false, error: '', success: true });
      } else {
        setLoading({
          loading: false,
          error: t(`errorCodes.${res.errorCode}`),
        });
      }
    });
  };

  return (
    <div className="flex pt-7 flex-col md:w-8/12 w-full md:pt-7 p-2 h-full mx-auto">
      <p className="mb-5 text-base font-bold">{t('navbar.contact')}</p>
      <form>
        <label className="mb-5 text-xs font-medium" htmlFor="name">
          {t('contact.name')}
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          className="my-2"
          maxLength="50"
          value={values.name}
          onChange={handleChange}
          placeholder={t('contact.name')}
        />
        <label className="mb-5 text-xs font-medium" htmlFor="email">
          {t('contact.email')}
        </label>
        <Input
          id="email"
          name="email"
          type="text"
          className="my-2"
          value={values.email}
          onChange={handleChange}
          placeholder={t('contact.email')}
        />
        <label className="mb-5 text-xs font-medium" htmlFor="subject">
          {t('contact.subject')}
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          className="my-2"
          value={values.subject}
          onChange={handleChange}
          placeholder={t('contact.subject')}
        />
        <label className="mb-5 text-xs font-medium" htmlFor="message">
          {t('contact.message')}
        </label>
        <Input
          id="message"
          name="message"
          type="text"
          textarea
          value={values.message}
          onChange={handleChange}
          className="my-2"
          placeholder={t('contact.message')}
        />
        {loading.error.length > 0 && (
          <p className="my-2 text-xs font-bold text-red-500">{loading.error}</p>
        )}
        {loading.success === true && (
          <p className="my-2 text-xs font-bold text-green-500">
            {t('contact.success')}
          </p>
        )}
        <Button
          onClick={handleSubmit}
          loading={loading.loading}
          extraClassName="mt-3 w-full"
        >
          {t('contact.send')}
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;
