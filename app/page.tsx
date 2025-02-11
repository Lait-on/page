'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [time, setTime] = useState<string | null>(null); // Initialisation avec null

  useEffect(() => {
    // Mise à jour de l'heure une fois que le composant est monté
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    setTime(new Date().toLocaleTimeString()); // Initialisation immédiate
    return () => clearInterval(timer); // Nettoyage du timer
  }, []);

  // Si l'heure n'est pas encore définie (côté client), on affiche un placeholder
  const formattedTime = time || "Loading...";

  

  return (
    <div className="home-page">
      <canvas id="background-canvas"></canvas> {/* Canvas pour la figure animée */}

      <div className="time-display">{formattedTime}</div> {/* Affichage de l'heure */}

      <header className="home-header">
        <h1 className="line1">LEON</h1>
        <h1 className="line2">HOGENMULLER</h1>
      </header>

      <nav className="menu">
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
        <ul className="menu-content">
          <li><Link href="/cv">CV</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/contact">Contacts</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
