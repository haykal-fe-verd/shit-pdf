import React from 'react';

interface HeaderProps {
  header: string;
}
function Header({ header }: HeaderProps) {
  return (
    <header className="bg-card text-card-foreground shadow">
      <div className="container mx-auto p-5">
        <h1 className="text-xl font-semibold leading-tight">{header}</h1>
      </div>
    </header>
  );
}

export default Header;
