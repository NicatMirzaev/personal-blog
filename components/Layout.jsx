import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

const Layout = ({ children, title }) => (
  <div style={{ paddingTop: '60px' }} className="w-full h-full">
    <Head>
      <title>{title} - Nicat Mirzaev Personal Blog</title>
    </Head>
    <Navbar />
    <div className="flex w-full h-full">{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
