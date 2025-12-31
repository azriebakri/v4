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
    'TypeScript',
    'React',
    'GraphQL',
    'Node.js',
    'AWS',
    'Docker',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="tag-heading">&lt;About Me/&gt;</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi, I'm Azrie! I'm passionate about building exceptional web experiences and
              constantly expanding my craft. My journey in web development began in 2018, and since
              then, I've grown from those early career days into a developer who thrives on solving
              complex problems.
            </p>

            <p>
              Throughout my career, I've had the opportunity to work across diverse
              environments—from a large-scale consultancy agency, to a product company partnering
              with Atlassian, and even navigating the fast-paced world of a startup. Each experience
              has shaped how I approach development and collaborate with teams.
            </p>

            <p>
              Currently, I'm focused on developing, implementing, and maintaining products at{' '}
              <a href="https://www.seekasia.com/">Seek</a>, where I contribute to building platforms
              that connect millions of job seekers with opportunities across Asia-Pacific.
            </p>

            <p>Here are a few technologies I've been working with recently:</p>
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
