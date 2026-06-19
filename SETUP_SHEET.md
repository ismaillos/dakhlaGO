# Integration Google Sheet — Etapes Simples

## Ce que tu dois faire (5 minutes) :

### 1. Ouvrir Apps Script
- Dans ton Google Sheet, clique sur **Extensions > Apps Script**

### 2. Coller le code
- Supprime tout le code par defaut
- Ouvre le fichier `apps-script.gs` dans ce projet
- Copie tout le code
- Colle-le dans Apps Script
- Sauvegarde (Ctrl+S) — donne le nom "DakhlaCommandes"

### 3. Deployer
- Clique sur **Deploy > New deployment** (en haut a droite)
- Clique sur l'icone **engrenage** (settings)
- Choisis **Web app**
- Remplis :
  - Description : `Commandes Dakhla`
  - Execute as : **Me**
  - Who has access : **Anyone**
- Clique **Deploy**

### 4. Autoriser
- Google va demander une autorisation
- Clique sur **Review permissions**
- Choisis ton compte Google
- Clique sur **Advanced** (en bas)
- Clique sur **Go to DakhlaCommandes (unsafe)**
- Clique **Allow**

### 5. Copier l'URL
- Tu vas voir une URL comme :
  `https://script.google.com/macros/s/ABC123XYZ/exec`
- **Copie cette URL**

### 6. Me donner l'URL
- Envoie-moi l'URL
- Je l'integrerai dans le code du site
- Je redeploierai le site

---

## Ce qui va se passer apres :
- Chaque commande du site ira **directement** dans ton Google Sheet
- Les commandes sont triees par date (plus recente en haut)
- Le statut "Nouvelle" te permet de suivre les commandes
- Tu modifies le statut manuellement : "Confirmee", "En livraison", "Livree"...

## Contact WhatsApp pour confirmation :
- Le client recoit un message : "Notre service client vous appelle sous 24h"
- Toi, tu vois la commande dans le Sheet avec le numero de telephone
- Tu appelles ou tu envoies un message WhatsApp pour confirmer
