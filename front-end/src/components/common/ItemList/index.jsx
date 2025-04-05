import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import SingleItem from "./SingleItem";

const ItemList = ({
  title,
  subtitle,
  itemsArray,
  path,
  idPath,
  type,
  seeMorePlacement,
  rounded = false,
  showYear = false,
  showPlays = false,
}) => {
  const showSeeMore = seeMorePlacement;

  return (
    <section className={`item-list ${rounded ? "item-list--rounded" : ""}`}>
      <div className="item-list__header">
        <div className="item-list__header-right">
          <h2 className="item-list__title">{title}</h2>
          <p className="item-list__subtitle">{subtitle}</p>
        </div>
        {showSeeMore && (
          <Link to={path} className="item-list__see-more">
            See more
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 7L14 12L10 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        )}
      </div>

      <div className="item-list__grid-container">
        {itemsArray.map((item) => (
          <SingleItem
            key={`${type}-${item._id}`}
            {...item}
            idPath={idPath}
            type={type}
            showYear={showYear}
            showPlays={showPlays}
          />
        ))}
      </div>
    </section>
  );
};

ItemList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  itemsArray: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  idPath: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["songs", "artists", "albums", "playlists"]).isRequired,
  seeMorePlacement: PropTypes.oneOf(["top", "bottom", false]),
  rounded: PropTypes.bool,
  showYear: PropTypes.bool,
  showPlays: PropTypes.bool,
};

ItemList.defaultProps = {
  seeMorePlacement: false,
  rounded: false,
  showYear: false,
  showPlays: false,
};

export default ItemList;