
const Logo = () => {
  const gradientStyle = {
    backgroundImage: "linear-gradient(to right, #ffcc00, #ff9900, #ff6600)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    backgroundSize: "200% 200%",
    animation: "gradient 2s infinite linear",
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src="/DhyaanShilaa.webp"
        alt=""
        width={40}
        style={{ borderRadius: "50%" }}
      />
      <div style={{ fontSize: "2rem", fontWeight: "bold", ...gradientStyle }}>
        DhyaanShilaa
      </div>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default Logo;
