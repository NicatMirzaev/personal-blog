/* eslint-disable react/self-closing-comp, arrow-body-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Button from './Button';
import Search from '../icons/Search';
import MoreIcon from '../icons/More';
import LanguageSelector from './LanguageSelector';
import LoginModal from './LoginModal';
import SettingsModal from './SettingsModal';
import UserAvatar from './UserAvatar';
import { removeValue } from '../../lib/store';
import { useAuth, useAuthContext } from '../AuthProvider';

const Navbar = () => {
  const { t } = useTranslation();
  const user = useAuthContext();
  const dispatch = useAuth();
  const [menu, setMenu] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [profileMenu, setProfileMenu] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const menuRef = React.createRef();
  const profileMenuRef = React.createRef();

  React.useEffect(() => {
    function handleClick(e) {
      if (
        menu === true &&
        menuRef &&
        !menuRef.current.contains(e.target) &&
        e.target.classList.value !== 'sm:hidden block cursor-pointer'
      ) {
        setMenu(false);
      }

      if (
        profileMenu === true &&
        profileMenuRef &&
        !profileMenuRef.current.contains(e.target) &&
        e.target.classList.value !==
          'bg-primary-900 hover:opacity-20 transition duration-200 opacity-0 absolute w-full h-full top-0 left-0 rounded-full'
      ) {
        setProfileMenu(false);
      }
    }

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [menu, menuRef, profileMenu, profileMenuRef]);

  const handleLogout = () => {
    setProfileMenu(false);
    setShowSettings(false);
    setOpenModal(false);
    removeValue('token');
    dispatch({ type: 'SET_USER', payload: null });
  };

  return (
    <nav className="flex fixed top-0 items-center h-14 bg-white w-full">
      {openModal === true && <LoginModal onClose={() => setOpenModal(false)} />}
      {showSettings === true && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
      <div className="flex w-full h-full items-center justify-between md:px-20 px-6">
        <Link href="/">
          <a className="w-10 h-10">
            <img className="object-contain" src="/logo.png" alt="logo" />
          </a>
        </Link>
        <div className="flex items-center">
          <Button link="/discover" color="transparent" size="small">
            <Search />
          </Button>
          <MoreIcon
            onClick={() => {
              setMenu(!menu);
              setProfileMenu(false);
            }}
            className="sm:hidden block cursor-pointer"
          />
          {menu === true && (
            <div
              ref={menuRef}
              className="origin-top-right absolute top-14 right-4 mt-2 w-56 rounded-md shadow-lg"
            >
              <div className="rounded-md bg-white shadow-xs">
                <div
                  className="pt-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link href="/about">
                    <a
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      {t('navbar.about')}
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      {t('navbar.contact')}
                    </a>
                  </Link>
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                      setMenu(false);
                    }}
                    color="transparent"
                    className="w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  >
                    {t('navbar.signIn')}
                  </Button>

                  <LanguageSelector extraClassName="flex justify-center" />
                </div>
              </div>
            </div>
          )}
          <Button
            extraClassName="sm:flex hidden mx-5"
            color="transparent"
            size="small"
            link="/about"
          >
            {t('navbar.about')}
          </Button>
          <Button
            extraClassName="sm:flex hidden mr-5"
            color="transparent"
            size="small"
            link="/contact"
          >
            {t('navbar.contact')}
          </Button>
          <LanguageSelector extraClassName="sm:flex hidden" />
          {!user ? (
            <Button
              onClick={() => setOpenModal(true)}
              extraClassName="sm:flex hidden ml-5"
            >
              {t('navbar.signIn')}
            </Button>
          ) : (
            <UserAvatar
              onClick={() => {
                setProfileMenu(!profileMenu);
                setMenu(false);
              }}
              extraClassName="ml-5"
              src={user.profileImg}
              username={user.displayName}
            />
          )}
          {profileMenu === true && (
            <div
              ref={profileMenuRef}
              className="origin-top-right absolute top-14 right-4 mt-2 w-56 rounded-md shadow-lg"
            >
              <div className="rounded-md bg-white shadow-xs">
                <div
                  className="pt-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link href={`/user/${user._id}`}>
                    <a
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      {t('profile.myProfile')}
                    </a>
                  </Link>
                  <Button
                    onClick={() => {
                      setShowSettings(true);
                      setProfileMenu(false);
                      setOpenModal(false);
                    }}
                    color="transparent"
                    className="w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  >
                    {t('profile.settings')}
                  </Button>
                  <Link href="/create-post">
                    <a
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      {t('profile.createPost')}
                    </a>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    color="transparent"
                    className="w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  >
                    {t('profile.logout')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
