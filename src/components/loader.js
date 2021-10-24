import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  color: #000;
  background-color: var(--linen);

  .loader-logo {
    position: relative;
    font-family: var(--font-mono);
    font-size: var(--fz-heading);
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;

    &::after {
      position: absolute;
      content: '<azrie-bakri';
      top: 0;
      left: 0;
      z-index: -1;
      width: 0;
    }
  }

  /* Animation */

  .animation-stretch-right {
    background-color: var(--linen);
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '.loader-logo',
        duration: 1200,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '.loader-logo .animation-stretch-right',
        delay: 500,
        duration: 1000,
        easing: 'easeInOutSine',
        marginLeft: '197px',
      })
      .add({
        targets: '.loader-logo .animation-stretch-right',
        delay: 700,
        duration: 1400,
        easing: 'easeInOutSine',
        marginLeft: '0px',
      })
      .add({
        targets: '.loader-logo',
        delay: 1000,
        duration: 700,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader-logo',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <div className="loader-logo animation-stretch">
        <span className="animation-stretch-left">&lt;a</span>
        <span className="animation-stretch-right">&#47;&gt;</span>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
