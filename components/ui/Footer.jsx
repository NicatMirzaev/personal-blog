import React from 'react';
import FacebookIcon from '../icons/Facebook';
import GithubIcon from '../icons/Github';
import MailIcon from '../icons/Mail';

const Footer = () => (
  <div className="flex flex-col w-1/2 xxxl:fixed xxxl:bottom-0 items-center border-solid border-t border-borderColor w-11/12 justify-center">
    <p className="mt-5 mb-1 text-base font-bold">Nicat Mirzaev</p>
    <p className="mb-2 text-sm font-semibold text-gray-500">Full Stack Developer.</p>
    <div className="flex items-center">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/nicat.mirzayev.5030/"
        className="mr-2"
      >
        <FacebookIcon />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/NicatMirzaev"
        className="mr-2"
      >
        <GithubIcon />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="mailto:nicatmirzoev111@gmail.com">
        <MailIcon />
      </a>
    </div>
    <div className="w-2 h-2" />
  </div>
);

export default Footer;
