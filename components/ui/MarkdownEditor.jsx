/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import ReactMde from 'react-mde';
import PropTypes from 'prop-types';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const style = {
  preview: 'bg-white',
};

export default function MarkdownEditor({ value, setValue }) {
  const [selectedTab, setSelectedTab] = React.useState('write');

  return (
    <ReactMde
      value={value}
      onChange={setValue}
      selectedTab={selectedTab}
      classes={style}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(converter.makeHtml(markdown))
      }
      childProps={{
        writeButton: {
          tabIndex: -1,
        },
      }}
    />
  );
}

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
