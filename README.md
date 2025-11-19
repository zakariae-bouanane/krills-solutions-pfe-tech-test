# 🎂 Birthday Tracker – Documentation d’installation

## 📝 Description du Projet
Birthday Tracker est une application web qui permet de suivre les anniversaires des amis, ajoutés manuellement via un formulaire.

## Technologies Utilisées
| Composant | Technologie | Version |
| :--- | :--- | :--- |
| **Backend (API)** | Quarkus (Java + JWT + Maven) | 3 |
| **Frontend (Interface)** | React (Vite + Tailwind CSS) | 18 |

## 🛑 Prérequis
Assurez-vous d’avoir :
- Java 17+ installé (java -version)
- Maven 3.8.6+ installé (mvn -version)
- Node.js 18+ et npm (node -v, npm -v)


---
## ⚠️ Important
> **Note CORS :** Le mécanisme CORS est déjà configuré dans le backend pour autoriser la communication avec le frontend.

> **⚠️ Note :** Ce script a été conçu pour l'environnement **Windows** (`.bat`). Si vous utilisez Linux ou macOS, vous devrez exécuter les commandes manuellement ou créer un script shell équivalent (`.sh`).
---
## OPTION 1 : ⚡ Lancement Rapide de l'Application (Script Automatisé)

Pour lancer le Backend et le Frontend simultanément, vous pouvez utiliser le script automatisé fourni. Cette méthode est la plus rapide pour démarrer l'environnement de développement.

### 1. Exécution du Script

Vous pouvez lancer le script depuis la racine (`krills-solutions-pfe-tech-test/`) du projet de deux manières :

#### Option 1 : Double-clic

* **Double-cliquez simplement sur le fichier :**
  `start-local.bat`

#### Option 2 : Via Terminal (CMD)

* **Exécutez la commande suivante dans le terminal (depuis la racine du projet) :**
  ```bash
  .\start-local.bat
  ```
  
Accéder à l’interface : http://localhost:5173.

Accéder au backend : http://localhost:8080.

### 🛑 Arrêt de l'Application

Le script `stop-local.bat` est fourni pour arrêter proprement et automatiquement tous les processus du Backend et du Frontend lancés localement.

### 1. Exécution du Script

Vous pouvez arrêter l'application depuis la **racine du projet** de deux manières :

#### Option 1 : Double-clic
* **Double-cliquez sur le fichier :**
`stop-local.bat`

#### Option 2 : Via Terminal (CMD)
* **Exécutez la commande :**
```bash
.\stop-local.bat
```

---

## OPTION 2 : 💻 Lancement Normal 

Ces instructions détaillent les étapes pour lancer le Backend et le Frontend séparément, en mode développement.

### 1. ⚙️ Backend Quarkus

#### 1.1 Accès et Lancement

Ouvrez un terminal, naviguez vers le répertoire `backend`, puis lancez l'application :

* **Windows OR Linux / macOS :**
    ```bash
    cd backend
    mvn quarkus:dev
    ```

L'API sera disponible sur : http://localhost:8080

### 2. 🖥️ Frontend React (Vite)

#### 2.1 Accès et Installation des Dépendances

Ouvrez un **nouveau** terminal et naviguez vers le répertoire `frontend`.

```bash
cd frontend
npm install
```

#### 2.2 Lancer l’application :

```bash
npm run dev
```

Accéder à l’interface : http://localhost:5173






