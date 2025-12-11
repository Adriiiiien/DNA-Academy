# DNA Academy par Adrien SIMON

---

## Présentation du Projet

**DNA Academy** est une plateforme web complète dédiée à l'univers du jeu **Duet Night Abyss**.
Développée avec une architecture Front + Back professionnelle, elle vise à fournir une base de données riche et des outils dynamiques pour la communauté.

### Fonctionnalités Clés

* **Consultation des Ressources :** Accès à la liste et aux pages de détails de tous les **personnages** et **armes**.
* **Tier List Dynamique :** Un système permettant de visualiser et d'interagir avec une liste de niveaux.
* **Authentification Sécurisée (JWT) :** Gestion des sessions utilisateurs (inscription, connexion).
* **Espace Administration :** Interface dédiée aux opérations **CRUD** (Créer, Lire, Modifier, Supprimer) sur les données des personnages.
* **Architecture SCSS Professionnelle :** Styles modulaires, maintenables et *scalables*.
* **API REST Structurée :** Un backend Node.js/Express exposé via des *endpoints* clairs et sécurisés.

---

## Architecture du Projet

Le projet suit une structure claire, séparant distinctement le backend (API, Controllers, Routes) du frontend (statique, SCSS, JS).

```text
DNA_Academy/
│
├── server.js # Entrée du serveur Express
├── package.json
├── .env
│
├── config/
│   └── db.js # Pool MySQL centralisé
│
├── controllers/
│   ├── authController.js
│   ├── charactersController.js
│   ├── weaponsController.js
│   └── elementsController.js
│
├── middlewares/
│   └── auth.js # verifyToken / requireAdmin
│
├── routes/
│   ├── auth.js
│   ├── characters.js
│   ├── weapons.js
│   └── elements.js
│
├── public/
│   ├── index.html
│   ├── characters.html
│   ├── character.html
│   ├── weapons.html
│   ├── weapon.html
│   ├── tierlist.html
│   ├── login.html
│   ├── register.html
│   ├── admin.html
│   │
│   ├── css/
│   │   └── style.css # SCSS compilé
│   │
│   ├── js/
│   │   ├── layout.js # Header/footer dynamique
│   │   ├── header-effect.js # Scroll effect du header
│   │   ├── session.js # Auth front (token, logout)
│   │   ├── list-*.js # Modules génériques (filters, search, pagination)
│   │   ├── characters-page.js
│   │   ├── character-detail-page.js
│   │   ├── weapons-page.js
│   │   ├── weapon-detail-page.js
│   │   ├── tierlist-page.js
│   │   ├── home-page.js
│   │   ├── login.js
│   │   ├── register.js
│   │   └── admin.js
│   │
│   ├── assets/
│       ├── images/
│       └── videos/
│
├── scss/
│   ├── base/ # reset, variables, typographie globale
│   ├── components/ # cards, lists, filters…
│   ├── layout/ # header, footer
│   ├── pages/ # styles spécifiques
│   └── style.scss
│
└── README.md
```

---

## Installation & Lancement

### 1 Installer les dépendances
À la racine du projet :
```bash
npm install
```

### 2 Configurer l’environnement

Créez un fichier `.env` à la racine :

```env
PORT=3000
JWT_SECRET=(exemple)QUSb?atdwpv§nbntrekVDEQT&f
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=dna_db
BCRYPT_SALT_ROUND=10
```

### 3 Lancer le serveur
```bash
npm run dev
```

Serveur accessible sur :
**http://localhost:3000**

> Le frontend est servi automatiquement via le dossier `public/`.

---

## Base de données

### Tables principales

**characters**
| id | name | element | image_icon_url | image_card_url |
|---|---|---|---|---|

**elements**
| name | icon |
|---|---|

**weapons**
| id | name | element | weapon_type | damage_type | image_url | base_atk | max_atk | crit_chance_pct | crit_damage_pct | image_url |
|---|---|---|---|---|---|---|---|---|---|---|

**character_weapons**
| id | character_id | weapon_id | is_best_in_slot | notes |
|---|---|---|---|---|

**users**
| id | username | password | role | created_at |
|---|---|---|---|---|

---

## Authentification (JWT)

L’interface admin utilise ce système pour autoriser les opérations CRUD.

**Routes :**
* `POST /api/auth/register` → créer un utilisateur
* `POST /api/auth/login` → renvoie un token JWT
* `GET /api/auth/me` → infos user via token

**Middleware :**
* `verifyToken`
* `requireAdmin`

---

## API Endpoints (résumé clair)

### Characters
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/characters` | Liste des personnages |
| GET | `/api/characters/:id` | Détail personnage |
| POST | `/api/characters` | Ajouter (admin + Token) |
| PUT | `/api/characters/:id` | Modifier (admin + Token) |
| DELETE | `/api/characters/:id` | Supprimer (admin + Token) |
| GET | `/api/characters/:id/weapons` | Obtenir armes liées |

### Weapons
| Méthode | Route |
|---|---|
| GET | `/api/weapons` |
| GET | `/api/weapons/:id` |

### Elements
| Méthode | Route |
|---|---|
| GET | `/api/elements` |

### Users
| Méthode | Route |
|---|---|
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter |
| GET | `/api/auth/me` | (Token) |

---

## Frontend : Structure & Fonctionnement

### Pages front

* **index.html** : home page + hero vidéo
* **characters.html** : listing + filtres + recherche + pagination
* **character.html** : détail personnage
* **weapons.html** : listing armes
* **weapon.html** : détail arme
* **tierlist.html** : tier list dynamique
* **login/register.html** : auth pages
* **admin.html** : CRUD personnages (interface simple et efficace)

> Toutes ces pages chargent le header et le footer dynamiquement via `layout.js`.

### Modules front (réutilisables)

* **ListFilters** : Gère l’affichage, l’état actif et le callback sur changement de filtre.
* **ListSearch** : Barre de recherche générique.
* **ListPagination** : Pagination totalement réutilisable.

---

## SCSS : Architecture professionnelle

```text
scss/
│
├── base/         # reset, variables globales, typographie
├── components/   # cards, filtres, pagination, éléments UI
├── layout/       # header, footer
├── pages/        # styles spécifiques à une page
└── style.scss    # fichier compilé en CSS
```

---

## Fonctionnement global de l'application

1.  Le backend expose une API REST.
2.  Le frontend consomme les endpoints via Fetch.
3.  Header/footer injectés dynamiquement.
4.  Authentification stockée en LocalStorage (token JWT).
5.  Middleware Express gère la sécurité admin.
6.  SCSS → compilé → style.css.

---

## Mode Admin (CRUD Personnages)

Accessible uniquement si :
1.  L’utilisateur est connecté.
2.  Son rôle est `admin`.
3.  Le token est valide.

**Fonctionnalités :**
Ajouter un personnage
Modifier un personnage
Supprimer un personnage
Voir la liste complète