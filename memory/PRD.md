# Hacks.Guide - PRD

## Original Problem Statement
Recréer le site wiiu.hacks.guide en tant que guide interactif avec un design Modern, Midnight Blue, GlassMorphism avec des animations subtiles. Inspiration: test.html (glassmorphism configurator) et example.html (homepage layout). Commencer par la page d'accueil.

## Architecture
- **Frontend**: React 18 + Tailwind CSS + Lucide React icons
- **Backend**: FastAPI (Python)
- **Database**: MongoDB (prêt pour l'intégration future)
- **Fonts**: Space Grotesk (headings) + Inter (body)

## User Personas
- Joueurs francophones intéressés par le homebrew Wii U / 3DS
- Communauté de modding Nintendo

## Core Requirements (Static)
1. Page d'accueil fidèle à example.html avec style glassmorphism de test.html
2. Noir pur (#050505) + bleu profond comme palette
3. GlassMorphism : backdrop-blur, semi-transparent backgrounds, subtle borders
4. Animations subtiles : reveal, slide-up, hover effects
5. Contenu en français
6. Intégration future avec Pretendo Network (authentification)

## What's Been Implemented (Jan-Feb 2026)
- Homepage complète : Navbar, Hero, Console Selector, Footer
- Design glassmorphism avec noir pur + bleu profond
- Animations reveal, hover lift, glow effects
- Cards console : Wii U (active) + 3DS (coming soon, disabled)
- Backend FastAPI avec endpoints health + consoles
- Guide Wii U step-by-step : 3 étapes (Info, Outils, Préparation SD)
- Step Indicator avec progression visuelle
- Page Info : avertissements, features Aroma, compatibilité
- Page Outils : matériel requis, formatage SD, checklist
- Page Préparation SD : sélecteur de composants (payloads, base aroma, plugins)
- **Bouton unique "Télécharger le pack complet"** avec récap des composants sélectionnés sous forme de tags dynamiques
- Instructions d'installation sur la carte SD (3 étapes)
- Tips : FAT32, écrasement, Mac-specific collapsible
- Section "Prêt pour l'installation" avec lien vers finalisation
- Section "Structure de la carte SD" supprimée (demande utilisateur)

## Prioritized Backlog
### P0 - Next Phase
- Pages Browser Exploit, PayloadLoader, Finalisation
- Navigation complète entre toutes les étapes

### P1
- Intégration Pretendo Network (authentification)
- Profil utilisateur
- Suivi de progression du guide (localStorage)

### P2
- Guide 3DS (quand disponible)
- Mode sombre/clair toggle
- Gestion des cheats / recommandations mods

## Next Tasks
1. Ajouter les pages Browser Exploit et PayloadLoader
2. Ajouter la page Finalisation de la configuration
3. Indicateur de progression persistant (localStorage)
