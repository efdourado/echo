import React from 'react';
import PropTypes from 'prop-types';

const Showcase = ({ title, description, ctaText }) => {
  return (
    <div className="showcase">
      <div className="showcase-container">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="showcase-cta">
          <button className="btn-primary">{ctaText}</button>
        </div>
      </div>
    </div>
); };

Showcase.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ctaText: PropTypes.string,
};

export default Showcase;