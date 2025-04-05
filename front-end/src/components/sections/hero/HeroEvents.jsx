import React from 'react';
import HeroSection from './HeroSection';
import PropTypes from 'prop-types';

const HeroEvents = ({ event, ...props }) => (
  <HeroSection
    variant="events"
    title="Próximos Eventos"
    subtitle="Experiências musicais inesquecíveis"
    ctaText="Comprar Ingressos"
    {...props}
  >
    {event && (
      <div className="hero__event">
        <div className="hero__event-badge">
          <span className="hero__event-day">{event.day}</span>
          <span className="hero__event-month">{event.month}</span>
        </div>
        <div className="hero__event-details">
          <h3>{event.name}</h3>
          <p>{event.location}</p>
          <p>{event.time}</p>
          {event.artists && (
            <div className="hero__event-artists">
              {event.artists.join(", ")}
            </div>
          )}
        </div>
      </div>
    )}
  </HeroSection>
);

HeroEvents.propTypes = {
  event: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    time: PropTypes.string,
    artists: PropTypes.arrayOf(PropTypes.string)
  })
};

export default HeroEvents;