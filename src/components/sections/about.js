import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    // flex-direction: column;
    // flex-wrap: wrap;
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      ${({ theme }) => theme.mixins.flexCenter};
      flex-direction: column;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--black);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }

  @media (max-width: 768px) {
    order: 2;
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--linen);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }
  }

  @media (max-width: 768px) {
    order: 1;
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (ES6+)',
    'Typescript',
    'React',
    'AngularJS',
    'Node.js',
    'AWS',
    'Docker',
    'GraphQL',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="tag-heading">&lt;About Me/&gt;</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello there! My name is Azrie and I enjoy creating web related things and learning new
              skills. My interest in web development started back in 2018 during my early days of my
              career.
            </p>

            <p>
              Fast-forward to today,I’ve had the privilege of working at{' '}
              <a href="https://www.avanade.com/ms-my">a huge consultancy agency</a>, and{' '}
              <a href="https://www.servicerocket.com/">a product company</a> that work closely with{' '}
              <b>Atlassian</b> and experience working in a{' '}
              <a href="https://www.servicerocket.com/">startup</a> environment
            </p>
            <p>
              My main focus these days is the development, implementation, maintenance, and support
              of products that contribute directly/indirectly towards unification between
              Jobstreets.com and JobsDB.com at <a href="https://www.seekasia.com/">Seek Asia</a>
            </p>
            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
