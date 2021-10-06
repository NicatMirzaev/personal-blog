import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Navbar from './ui/Navbar';

const Layout = ({ children, title, navbarMaxWidth }) => (
  <div style={{ paddingTop: '60px' }} className="w-full h-full">
    <Head>
      <title>{title} - Nicat Mirzaev Personal Blog</title>
    </Head>
    <Navbar maxWidth={navbarMaxWidth} />
    <div className="flex w-full">{children}</div>
  </div>
);

Layout.defaultProps = {
  navbarMaxWidth: '1024px',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  navbarMaxWidth: PropTypes.string,
};

export default Layout;
