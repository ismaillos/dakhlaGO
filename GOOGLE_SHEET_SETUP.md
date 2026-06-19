# Configuration Google Sheet — Commandes Dakhla Artisanal

## Etape 1 : Creer le Google Sheet

1. Va sur https://sheets.new
2. Donne un nom : "Commandes Dakhla Artisanal"
3. La premiere feuille s'appelle "Commandes" (c'est la que les donnees arrivent)

## Etape 2 : Ouvrir Apps Script

1. Dans ton Sheet, clique sur **Extensions > Apps Script**
2. Supprime le code par defaut
3. Colle ce code :

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Ajoute les en-tetes si premiere ligne
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'Nom', 'Telephone', 'Adresse', 'Ville', 'Produit', 'Quantite', 'Prix Total', 'Statut']);
      // Formate l'en-tete en gras
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    // Ajoute la commande
    sheet.appendRow([
      new Date(),
      data.nom || '',
      data.telephone || '',
      data.adresse || '',
      data.ville || '',
      data.produit || '',
      data.quantite || '',
      data.prix || '',
      'Nouvelle'
    ]);

    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({status: 'OK'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Sauvegarde (Ctrl+S) et donne un nom au projet : "DakhlaCommandes"

## Etape 3 : Deployer comme Web App

1. Clique sur **Deploy > New deployment**
2. Clique sur l'icone d'engrenage (settings) et choisis **Web app**
3. Configure :
   - **Description** : "Commandes Dakhla"
   - **Execute as** : Me
   - **Who has access** : Anyone
4. Clique **Deploy**
5. Autorise les permissions (clique sur "Review permissions" puis "Allow")
6. Copie l'URL du Web App (ca ressemble a : `https://script.google.com/macros/s/ABC123/exec`)

## Etape 4 : Mettre a jour le site

1. Ouvre le fichier `src/components/OrderForm.tsx`
2. Remplace la ligne :
```javascript
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx_PLACEHOLDER/exec';
```
Par ton URL reelle :
```javascript
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/TON_ID_ICI/exec';
```
3. Rebuild et redeploy

## Etape 5 : Verifier

1. Remplis le formulaire sur le site
2. Regarde ton Google Sheet — la commande doit apparaitre en quelques secondes
3. Si ca ne marche pas, verifie que le Web App est bien deploye avec "Anyone" access

## Astuce : Tri automatique

Pour trier les commandes par date (plus recente en haut), ajoute ce trigger dans Apps Script :

1. Dans Apps Script, clique sur l'icone **Triggers** (horloge)
2. Clique **+ Add Trigger**
3. Configure :
   - **Choose function** : doPost
   - **Deployment** : Head
   - **Event source** : From spreadsheet
   - **Event type** : On form submit
4. Ou ajoute cette fonction et un trigger horaire :

```javascript
function trierCommandes() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 9);
  range.sort({column: 1, ascending: false});
}
```

Puis cree un trigger horaire (toutes les heures) pour trier automatiquement.
