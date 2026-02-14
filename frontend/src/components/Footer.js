import React from 'react';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="w-full py-10 md:py-12 border-t border-white/5 flex flex-col items-center px-6"
    >
      <span className="text-slate-600 text-[11px] font-bold uppercase tracking-widest">
        © 2026 HACKS.GUIDE — NON AFFILIÉ À NINTENDO CO., LTD.
      </span>
    </footer>
  );
}
