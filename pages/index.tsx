import { Container } from 'react-bootstrap';
import anime from 'animejs';

import AudioNestNavbar from '../src/components/Navbars/MainNavbar';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    anime({
      targets: '.line-drawing-demo .lines path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function (el, i) { return i * 250; },
      direction: 'alternate',
      loop: true,
    });
  });

  return (
    <div>
      <AudioNestNavbar />
      <Container>
        <main>
          <h1 style={{
            fontSize: 'xxx-large',
            fontWeight: 800,
          }}>
            Welcome to <span style={{ color: '#98611F' }}>AudioNest</span>
          </h1>
          <p style={{
            fontSize: 'xx-large',
            fontWeight: 500,
          }}>
            The nest you never want to leave...
          </p>
        </main>
        <div style={{
          fontSize: 'x-large',
          fontWeight: 500,
        }}>
            The <span style={{ color: '#98611F' }}>aim</span> of this project is to <span style={{ color: '#98611F' }}>explore</span> different
            types of audio integrations as well as <span style={{ color: '#98611F' }}>music and audio</span> in general. I look to house any in features or
            findings in a central place <span style={{ color: '#98611F' }}>for anyone</span> who might find it useful or interesting.

            Hope you <span style={{ color: '#98611F' }}>enjoy</span> your stay!
        </div>
        <div className="line-drawing-demo">
          <svg viewBox="0 50 340 333">
            <path
              className="welcome-svg-path-triangle"
              fill="#1A1717"
              stroke="#98611F"
              strokeWidth="4"
              d="M165 60 L55 240 L275 240 Z"/>
            {/* <path
              className="welcome-svg-path-circle"
              stroke="#98611F"
              strokeWidth="5"
              fill="#1A1717"
              d="M 100 350 q 150 -300 300 0"
            /> */}
          </svg>
        </div>
      </Container>
    </div>
  );
}
