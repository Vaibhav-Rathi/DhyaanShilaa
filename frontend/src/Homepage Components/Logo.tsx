const Logo = () => {
  return (
    <div className="flex items-center gap-x-3">
      <img
        src="/Logo.ico"
        alt="Einfra Logo"
        className="w-12 h-12 object-contain"
      />
      <div className="text-3xl mb-2 font-semibold tracking-wide">
        EinfraTech
      </div>
    </div>
  );
};

export default Logo;
