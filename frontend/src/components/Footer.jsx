import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-300 text-blue-950 text-center py-4 shadow-inner mt-8">
      &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
    </footer>
  );
}

export default Footer;
