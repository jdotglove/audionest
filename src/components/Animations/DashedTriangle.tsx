export default function dashedTriangle() {
  return (
    <div>
      <svg viewBox="0 65 340 200" className="d-none d-lg-block">
        <path
          className="welcome-svg-path-triangle"
          fill="#1A1717"
          stroke="#98611F"
          strokeWidth="4"
          d="M165 70 L55 240 L275 240 Z"
        />
        {/* <path
              className="welcome-svg-path-circle"
              stroke="#98611F"
              strokeWidth="5"
              fill="#1A1717"
              d="M 100 350 q 150 -300 300 0"
            /> */}
      </svg>
      <svg viewBox="0 50 340 333" className="d-lg-none">
        <path
          className="welcome-svg-path-triangle"
          fill="#1A1717"
          stroke="#98611F"
          strokeWidth="4"
          d="M165 60 L55 240 L275 240 Z"
        />
        {/* <path
              className="welcome-svg-path-circle"
              stroke="#98611F"
              strokeWidth="5"
              fill="#1A1717"
              d="M 100 350 q 150 -300 300 0"
            /> */}
      </svg>
    </div>
  );
}
