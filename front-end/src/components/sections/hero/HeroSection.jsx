import React from 'react';
import PropTypes from 'prop-types';

const HeroSection = ({ 
  variant = 'default',
  title,
  subtitle,
  ctaText,
  ctaLink,
  bgImage,
  overlay = true,
  children
}) => {
  return (
    <section 
      className={`hero hero--${variant}`}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
      aria-label={title}
    >
      {overlay && <div className="hero__overlay"></div>}
      
      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">{title}</h1>
          {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        </div>
        
        {ctaText && (
          <a href={ctaLink} className={`hero__cta hero__cta--${variant}`}>
            {ctaText}
          </a>
        )}
        
        {children}
      </div>
    </section>
); };

HeroSection.propTypes = {
  variant: PropTypes.oneOf(['default', 'welcome', 'events']),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  bgImage: PropTypes.string,
  overlay: PropTypes.bool,
  children: PropTypes.node
};

export default HeroSection;