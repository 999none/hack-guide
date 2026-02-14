import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" data-testid="breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}
          {item.href ? (
            <Link to={item.href} className="breadcrumb-link text-gray-400 hover:text-blue-500 no-underline font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
