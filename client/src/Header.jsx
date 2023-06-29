import React from "react";

const Header = () => {
  return (
    <header className="w-full border-4 h-16 p-2 flex items-center justify-start sticky top-0 bg-white">
      <img src="/icon.png" className="w-20 h-20" />
      <p className="uppercase">Weather Information System</p>
    </header>
  );
};

export default Header;
