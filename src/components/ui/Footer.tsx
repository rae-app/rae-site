import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6">
      <div className="max-w-6xl mx-auto px-4 flex justify-center sm:flex-row items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Rae. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;