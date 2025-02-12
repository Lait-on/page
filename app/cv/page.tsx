'use client';

import React, { useState } from 'react';
import './CVPage.css';
import { DynamicBackground } from './CVPage.js';

interface SkillBarProps {
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ level }) => (
  <div className="skill-bar">
    <div className="fill" style={{ width: `${level}%` }}></div>
  </div>
);

const LanguageBar: React.FC<SkillBarProps> = ({ level }) => (
  <div className="language-bar">
    <div className="fill" style={{ width: `${level}%` }}></div>
  </div>
);

interface CVContentProps {
  language: string;
}

const CVContent: React.FC<CVContentProps> = ({ language }) => (
  <>
    <div className="header">
      <img src="/photo.JPG" alt="Profile" className="profile-image" />
      <h1 className="name">Léon Hogenmuller</h1>
    </div>

    <div className="contact-info">
      <p>Mail: <a href="mailto:leon.hogenmuller@dauhine.eu">leon.hogenmuller@dauhine.eu</a> | Phone: +33 7 68 10 68 89 | GitHub: <a href="https://github.com/Lait-on" target="_blank" rel="noopener noreferrer">Lait_on</a></p>
    </div>

    <div className="main-content">
      <div className="left-column">
        <div className="section competences">
          <h2>{language === 'FR' ? 'Compétences' : 'Skills'}</h2>
          <p>Python</p><SkillBar level={90} />
          <p>C</p><SkillBar level={85} />
          <p>Java</p><SkillBar level={80} />
          <p>Suite Office</p><SkillBar level={75} />
          <p>Haskell</p><SkillBar level={50} />
        </div>

        <div className="section langues">
          <h2>{language === 'FR' ? 'Langues' : 'Languages'}</h2>
          <p>Français</p><LanguageBar level={100} />
          <p>Anglais</p><LanguageBar level={75} />
          <p>Espagnol</p><LanguageBar level={30} />
        </div>

        <div className="section interets">
          <h2>{language === 'FR' ? 'Centres d’intérêt' : 'Interests'}</h2>
          <p>{language === 'FR' ? 'Course à Pied, Jeux Vidéo, Puzzles Algorithmiques' : 'Running, Video Games, Algorithmic Puzzles'}</p>
        </div>
      </div>

      <div className="right-column">
        <div className="section formation">
          <h2>{language === 'FR' ? 'Formation' : 'Education'}</h2>
          <p><strong>Université Paris Dauphine - PSL (Paris)</strong><br /><small>2022-2025</small><br />{language === 'FR' ? 'Licence en Informatique et Mathématiques pour la Décision et les Données (IM2D)' : 'Bachelor in Computer Science and Mathematics for Decision and Data (IM2D)'}</p>
          <p><strong>Lycée Henri-Matisse (Montreuil)</strong><br /><small>2022</small><br />{language === 'FR' ? 'Baccalauréat Scientifique, Mention Très Bien' : 'Scientific Baccalaureate, High Honors'}</p>
        </div>

        <div className="section projets">
          <h2>{language === 'FR' ? 'Projets' : 'Projects'}</h2>
          <ul>
            <li><strong>Tetris (C)</strong>: {language === 'FR' ? 'Interface graphique avancée.' : 'Advanced graphical interface.'}</li>
            <li><strong>Mastermind (Shell)</strong>: {language === 'FR' ? 'Version textuelle.' : 'Text-based version.'}</li>
            <li><strong>Simulation d&apos;une Machine Assembleur (C)</strong>: {language === 'FR' ? 'Simulateur d\'instructions.' : 'Instruction simulator.'}</li>
            <li><strong>Snake (C)</strong>: {language === 'FR' ? 'Implémentation terminal.' : 'Terminal implementation.'}</li>
            <li><strong>Morpion (Python)</strong>: {language === 'FR' ? 'Interface graphique simple.' : 'Simple graphical interface.'}</li>
          </ul>
        </div>

        <div className="section experience">
          <h2>{language === 'FR' ? 'Expérience' : 'Experience'}</h2>
          <p><strong>{language === 'FR' ? 'Serveur (CDD)' : 'Waiter (Fixed-term)'}</strong> <small>Juin - Août 2023</small><br />Maisons de Famille Villa Concorde</p>
          <p><strong>{language === 'FR' ? 'Accompagnement scolaire' : 'Academic Support'}</strong> <small>2023 - 2025</small><br />{language === 'FR' ? 'Suivi personnalisé de 2 élèves de Terminale.' : 'Personalized support for 2 high school students.'}</p>
        </div>
      </div>
    </div>
  </>
);

const CVPage: React.FC = () => {
  const [language, setLanguage] = useState<string>('FR');

  return (
    <div>
      <DynamicBackground />
      <button className="lang-toggle" onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}>
        {language === 'FR' ? 'English Version' : 'Version Française'}
      </button>
      <div className="cv-container">
        <CVContent language={language} />
      </div>
    </div>
  );
};

export default CVPage;
