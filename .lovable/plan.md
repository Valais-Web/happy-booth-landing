

# Refonte visuelle complète — direction "fun confiant"

Refonte du design visuel d'`Index.tsx` selon le modèle fourni. **Aucun texte/contenu ne change**, seulement l'aspect visuel : typographie, palette, mise en page, sections, animations.

## Direction artistique

- **Typographie** : `Bricolage Grotesque` (700) pour titres et logo, `Instrument Serif` italique (400) pour les accents poétiques (« souvenirs *magiques* »), `Inter` pour le corps de texte. Les anciennes polices (Dosis / Nunito Sans) sont retirées.
- **Palette Happy Booth** sur fond crème, en accents (pas en aplats) :
  - Crème `#fbf7ef`, Crème chaude `#f5eedd`, Encre `#1a1a1a`
  - Rose `#ff5ea8`, Jaune `#ffd84d`, Bleu `#4a7cff`, Menthe `#7dd9b8`, Lilas `#c4a8ff`, Corail `#ff7a52`
- **Rythme des sections** : crème → noir → crème → crème chaude → rose, pour casser la monotonie.
- **Détails fun** : sparkles flottants, photos polaroïd inclinées, surlignage jaune sur un mot du H1, pills animés (point menthe pulsant), micro-rotations au hover.

## Sections refondues (contenu inchangé)

1. **Nav** flottante : pilule arrondie, blur, logo emoji wobble, CTA noir → rose au hover.
2. **Hero** : H1 énorme avec mot surligné jaune incliné + accent italique serif, pill « disponible », 2 CTA (noir plein + ghost), bande de 5 polaroïds éparpillés en gradients colorés, sparkles flottants.
3. **Logos clients** : marquee défilement infini, mask gradient sur les bords.
4. **Use cases (« Quand louer »)** : 3 cartes carrées colorées (rose pâle / bleu pâle / jaune pâle) avec emoji décoratif géant en bas-droite à 25% d'opacité, listes à puces ✓.
5. **Booths (« Six booths »)** : section **fond noir**, grille 3×2, chaque carte avec un visuel gradient coloré + tag pill coloré + nom Bricolage.
6. **Why us (« Le service qu'on aurait voulu »)** : layout 2 colonnes, features avec barre noire en haut + petit carré coloré pour l'icône.
7. **How it works (« Quatre étapes »)** : 4 cartes crème sur fond crème chaud, gros chiffres colorés (rose / bleu / corail / menthe).
8. **Testimonials (« Ils en parlent »)** : 3 cartes blanches, citation en Instrument Serif italique grande taille, étoiles jaunes, avatar coloré avec initiales.
9. **Pricing (« Des forfaits tout compris »)** : strip blanc avec bulle jaune décorative, liste ✓, badge prix jaune.
10. **FAQ (« Questions fréquentes »)** : layout 2 colonnes, accordéon custom avec icône ronde +/− qui devient rose à l'ouvert.
11. **Contact form (« On vient à la fête »)** : section **fond rose** avec bulles jaune/bleu décoratives, formulaire crème arrondi, chips de type d'événement sélectionnables. Le formulaire conserve : tous les champs existants, `name="contact"`, `data-netlify`, `form-name`, honeypot, push dataLayer, encode + POST Netlify (zéro changement fonctionnel).
12. **Footer** : fond noir, grille 4 colonnes, tagline en Instrument Serif italique.

## Détails techniques

- **`src/index.css`** : remplacer les variables couleur par la nouvelle palette (HSL), importer Bricolage Grotesque + Instrument Serif + Inter via Google Fonts, ajouter les classes utilitaires `.font-display` (Bricolage) et `.font-serif-italic` (Instrument Serif), nouvelles animations `wobble`, `pulse`, `sparkleFloat`, `fadeUp`, `scroll`, classes pour les polaroïds.
- **`tailwind.config.ts`** : ajouter les familles `display: ['Bricolage Grotesque']`, `serif: ['Instrument Serif']`, `sans: ['Inter']`, et étendre `colors` avec `cream`, `cream-warm`, `ink`, `pink`, `yellow`, `blue`, `mint`, `lilac`, `coral`.
- **`src/pages/Index.tsx`** : réécriture complète du JSX section par section avec les nouvelles classes Tailwind. Les hooks (`useState`, `useEffect`), la logique (`handleSubmit`, `encode`, dataLayer, gclid), les imports d'images, l'i18n (`t()`, `tArray()`), le `LanguageSwitcher`, le `SEOHead`, le `ClientLogosCarousel` sont **conservés tels quels**.
- **`src/components/ClientLogosCarousel.tsx`** : retravaillé pour rendre le marquee mask-gradient style modèle (logos plus discrets, opacity 0.55).
- **`index.html`** : mettre à jour `<title>` font preconnect si besoin (Bricolage / Instrument Serif / Inter). Le formulaire caché Netlify et le GTM restent intacts.
- Aucune modification du `LanguageSwitcher`, du `SEOHead`, des fichiers de traduction, ni de la logique de soumission Netlify.

## Hors scope

- Aucun changement de copy, de structure des données du formulaire, de routes, ou d'intégrations (GTM, Netlify, dataLayer restent identiques).
- Pas de nouvelles dépendances npm — tout en CSS + Tailwind + fonts Google.

