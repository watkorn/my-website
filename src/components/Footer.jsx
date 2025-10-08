import React from 'react';

export default function Footer() {
  const quote = "Flags don’t hide. You just haven’t looked hard enough.";

  return (
    <footer className="footer text-center py-4 text-sm text-gray-600 dark:text-gray-400">
      <p>{quote}</p>
      <p>
        &copy; {new Date().getFullYear()} Watcharakorn Khambung. All rights reserved.
      </p>
    </footer>
  );
}
