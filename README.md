# 🎧 Livecoding DAW – Creative Web Music Studio

Un environnement modulaire de création musicale orienté **live coding** et **séquenceur visuel**, permettant de composer, manipuler et enregistrer de la musique directement depuis le navigateur.

---

## 🚀 Fonctionnalités principales

- 🎛️ Synthétiseurs visuels style VST avec filtres et effets
- 🥁 Séquenceur rythmique complet (kick, snare, hats, toms, rim...)
- 🎹 Grilles de notes (basse, lead, pads) sur 3 octaves + demi-tons
- ✍️ Éditeur live coding (Monaco/CodeMirror à venir)
- 🎚️ Quantisation, presets, visualisation audio
- 📦 Drag & drop de samples personnalisés
- 📡 API Node.js + MongoDB pour stocker presets et séquences
- 🔁 Enregistrement audio live (Web Audio API)
- 🔄 Hot Reload Front + Back

---

## 🧰 Stack technique

| Frontend    | Backend     | Autres            |
|-------------|-------------|-------------------|
| React + Vite | Fastify + TypeScript | Tone.js, TailwindCSS, Docker, MongoDB |

---

## 🛠️ Installation locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-repo/livecoding-daw.git
cd livecoding-daw
```

### 2. Configurer les fichiers `.env`

- `./front/.env.front` :
```env
VITE_API_URL=http://localhost:3000
```

- `./back/.env.backend` :
```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/livecoding
```

### 3. Lancer avec Docker (recommandé)

```bash
docker-compose up --build
```

**Services disponibles :**

| Service   | URL                         |
|-----------|-----------------------------|
| Frontend  | http://localhost:5173       |
| Backend   | http://localhost:3000/api/ping |
| MongoDB   | mongodb://mongo:27017       |

Le hot reload est actif pour les 2 services (`npm run dev`).

### 4. Lancer manuellement (optionnel)

#### Backend :
```bash
cd back
npm install
npm run dev
```

#### Frontend :
```bash
cd front
npm install
npm run dev
```

---

## 📦 Structure du projet

```
/front         → React + Vite + Tailwind
/back          → Fastify + TypeScript + MongoDB
docker-compose.yml
```

---

## 📚 Documentation interne

> Chaque module est documenté dans un sous-dossier :

- `/front/components/README.md`
- `/back/models/README.md`
- `/docs/architecture.md` *(à venir)*

---

## 🧪 À venir

- 🎧 Interface synthé complète par instrument
- 🎹 Éditeur de code musical live
- 🗃️ Galerie publique de presets
- ⌛ Quantisation & swing
- 🎥 Visualisation spectrale globale

---

## 🧑‍💻 Développeur

Projet personnel imaginé et conçu par **Gabi** ✨  

---

## 📝 Licence

MIT