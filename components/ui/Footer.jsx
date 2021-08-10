import React from 'react';
import Link from 'next/link';
import FacebookIcon from '../icons/Facebook';
import GithubIcon from '../icons/Github';
import MailIcon from '../icons/Mail';

const Footer = () => (
  <div className="flex flex-col w-1/2 items-center border-solid border-t border-borderColor w-11/12 justify-center">
    <p className="mt-5 mb-1 text-base font-bold">Nicat Mirzaev</p>
    <p className="mb-2 text-sm font-semibold text-gray-500">
      Full Stack Developer.
    </p>
    <div className="flex items-center">
      <Link href="/">
        <a className="mr-2">
          <FacebookIcon />
        </a>
      </Link>
      <Link href="/">
        <a className="mr-2">
          <GithubIcon />
        </a>
      </Link>
      <Link href="/">
        <a>
          <MailIcon />
        </a>
      </Link>
    </div>
    <div className="w-2 h-2" />
  </div>
);

export default Footer;
