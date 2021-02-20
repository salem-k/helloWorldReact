import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, BicyclingLayer } from '@react-google-maps/api';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {}
}));

// ----------------------------------------------------------------------

GoogleMapBicyclingLayer.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapBicyclingLayer({ themes, className, ...other }) {
  const classes = useStyles();

  const center = { lat: 42.3726399, lng: -71.1096528 };
  const mapOptions = {
    zoom: 14,
    minZoom: 2,
    maxZoom: 16,
    center: center,
    controlSize: 24,
    scaleControl: true,
    streetViewControl: false
  };

  return (
    <div className={clsx(classes.root, className)}>
      <GoogleMap
        options={mapOptions}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        {...other}
      >
        <BicyclingLayer />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapBicyclingLayer;
