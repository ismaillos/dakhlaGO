// ============================================================
// GOOGLE APPS SCRIPT — Commandes Dakhla Artisanal
// Sheet ID: 1SsoBsyTOH7t57CiVZWVdn1TzevHDOEh8dAxDl6iQnZw
// ============================================================

var SHEET_ID = '1SsoBsyTOH7t57CiVZWVdn1TzevHDOEh8dAxDl6iQnZw';
var SHEET_NAME = 'Commandes';  // Nom de la feuille

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    // Ouvre le spreadsheet par ID
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Si la feuille n'existe pas, la cree
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Parse les donnees JSON
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      data = e.parameter || {};
    }

    // Ajoute les en-tetes si premiere ligne
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'Nom', 'Telephone', 'Adresse', 'Ville', 'Produit', 'Quantite', 'Prix Total', 'Statut']);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#E8732F').setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
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

    // Tri par date decroissante (plus recente en haut)
    var lastRow = sheet.getLastRow();
    if (lastRow > 2) {
      var range = sheet.getRange(2, 1, lastRow - 1, 9);
      range.sort({column: 1, ascending: false});
    }

    // Reponse de succes
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Commande enregistree'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Pour les requetes GET (test)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'OK',
    message: 'Service Dakhla Artisanal actif'
  })).setMimeType(ContentService.MimeType.JSON);
}
