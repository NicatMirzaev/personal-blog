import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import Footer from '../ui/Footer';

const AboutPage = () => {
  const remarkGfm = dynamic(() => import('remark-gfm'), { ssr: false });
  const { t } = useTranslation();
  return (
    <div className="flex pt-7 flex-col md:w-8/12 w-full md:pt-7 p-2 h-full max-w-screen-lg mx-auto">
      <ReactMarkdown
        components={{
          a: ({ ...props }) => <a target="_blank" style={{ color: '#0000EE' }} {...props} />,
          p: ({ ...props }) => <p style={{ marginBottom: '10px' }} {...props} />,
        }}
        remarkPlugins={[remarkGfm]}
      >
        {t('about')}
      </ReactMarkdown>
      <Footer />
    </div>
  );
};

export default AboutPage;
