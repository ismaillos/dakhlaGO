// ============================================================
// GOOGLE APPS SCRIPT — Commandes Dakhla Artisanal
// Sheet ID: 1SsoBsyTOH7t57CiVZWVdn1TzevHDOEh8dAxDl6iQnZw
//
// DEPLOYMENT:
//  1. Open https://script.google.com and create a new project
//  2. Paste this file content
//  3. Click Deploy > New deployment > Web App
//  4. Execute as: Me | Who has access: Anyone
//  5. Copy the Web App URL and set it as VITE_SHEET_WEBHOOK_URL in your .env
// ============================================================

var SHEET_ID = '1SsoBsyTOH7t57CiVZWVdn1TzevHDOEh8dAxDl6iQnZw';
var SHEET_NAME = 'dakhlacommande';
var DEMANDES_SHEET_NAME = 'demandes_produits';

var HEADERS = ['Date', 'Type', 'Nom', 'Telephone', 'Adresse', 'Ville', 'Produit(s)', 'Quantite', 'Prix Total', 'Statut'];
var DEMANDES_HEADERS = ['Date', 'Nom', 'Telephone', 'Email', 'Produit Demande', 'Statut'];

function getOrCreateSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var header = sheet.getRange(1, 1, 1, HEADERS.length);
    header.setFontWeight('bold').setBackground('#E8732F').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(7, 280);
  }
  return sheet;
}

function getOrCreateDemandesSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(DEMANDES_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(DEMANDES_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(DEMANDES_HEADERS);
    var header = sheet.getRange(1, 1, 1, DEMANDES_HEADERS.length);
    header.setFontWeight('bold').setBackground('#5B7B5E').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(5, 320);
  }
  return sheet;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      data = e.parameter || {};
    }

    var type = data.type || 'single';

    // ── Demande produit non catalogue ──
    if (type === 'demande') {
      var demandesSheet = getOrCreateDemandesSheet();
      demandesSheet.appendRow([
        new Date(),
        data.nom || '',
        data.telephone || '',
        data.email || '',
        data.produit_demande || '',
        'A traiter',
      ]);
      var dLastRow = demandesSheet.getLastRow();
      if (dLastRow > 2) {
        demandesSheet.getRange(2, 1, dLastRow - 1, DEMANDES_HEADERS.length).sort({ column: 1, ascending: false });
      }
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'success', message: 'Demande enregistrée' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── Commande normale ──
    var sheet = getOrCreateSheet();
    var produits = '';
    var quantite = '';
    var prixTotal = '';

    if (type === 'cart') {
      produits = data.items || '';
      quantite = 'Panier';
      prixTotal = data.total || '';
    } else {
      produits = data.produit || '';
      quantite = data.quantite || '';
      prixTotal = data.prix || '';
    }

    sheet.appendRow([
      new Date(),
      type === 'cart' ? 'Panier' : 'Simple',
      data.nom || '',
      data.telephone || '',
      data.adresse || '',
      data.ville || '',
      produits,
      quantite,
      prixTotal,
      'Nouvelle',
    ]);

    var lastRow = sheet.getLastRow();
    if (lastRow > 2) {
      sheet.getRange(2, 1, lastRow - 1, HEADERS.length).sort({ column: 1, ascending: false });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', message: 'Commande enregistrée' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Health check endpoint
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'OK', message: 'Service Dakhla Artisanal actif' }))
    .setMimeType(ContentService.MimeType.JSON);
}
