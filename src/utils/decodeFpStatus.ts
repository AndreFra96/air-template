export type DecodedFpStatus = {
  stato: string;
  dgfe: string;
  cassetto: string;
  scontrino: string;
  modalità: string;
};

/**
 * Decodifica lo stato della stampante restituendo un oggetto con le informazioni in forma testuale
 * @param status informazione su 5 bit contenente lo stato della stampante
 * @returns stato della stampante in forma testuale
 */
export function decodeFpStatus(status: string): DecodedFpStatus {
  let stato = "";
  let dgfe = "";
  let cassetto = "";
  let scontrino = "";
  let modalità = "";

  switch (status.substring(0, 1)) {
    case "0":
      stato = "OK";
      break;
    case "2":
      stato = "Carta in esaurimento";
      break;
    case "3":
      stato = "Offline (fine carta o coperchio aperto)";
      break;
    default:
      stato = "Risposta errata";
  }

  switch (status.substring(1, 2)) {
    case "0":
      dgfe = "OK";
      break;
    case "1":
      dgfe = "Prossimo ad Esaurimento";
      break;
    case "2":
      dgfe = "Da formattare";
      break;
    case "3":
      dgfe = "Precedente";
      break;
    case "4":
      dgfe = "Di altro misuratore";
      break;
    case "5":
      dgfe = "Esaurito";
      break;
    default:
      dgfe = "Risposta errata";
  }

  switch (status.substring(2, 3)) {
    case "0":
      cassetto = "Aperto";
      break;
    case "1":
      cassetto = "Chiuso";
      break;
    default:
      cassetto = "Risposta errata";
  }

  switch (status.substring(3, 4)) {
    case "0":
      scontrino = "Fiscale aperto";
      break;
    case "1":
      scontrino = "Fiscale/Non fiscale chiuso";
      break;
    case "2":
      scontrino = "Non fiscale aperto";
      break;
    case "3":
      scontrino = "Pagamento in corso";
      break;
    case "4":
      scontrino =
        "Errore ultimo comando ESC/POS con Fiscale/Non fiscale chiuso";
      break;
    case "5":
      scontrino = "Scontrino in negativo";
      break;
    case "6":
      scontrino = "Errore ultimo comando ESC/POS con Non fiscale aperto";
      break;
    case "7":
      scontrino = "Attesa chiusura scontrino modalit&agrave; JAVAPOS";
      break;
    case "8":
      scontrino = "Documento fiscale aperto";
      break;
    case "A":
      scontrino = "Titolo aperto";
      break;
    case "2":
      scontrino = "Titolo chiuso";
      break;
    default:
      scontrino = "Risposta errata";
  }

  switch (status.substring(4, 5)) {
    case "0":
      modalità = "Stato registrazione";
      break;
    case "1":
      modalità = "Stato X";
      break;
    case "2":
      modalità = "Stato Z";
      break;
    case "3":
      modalità = "Stato Set";
      break;
    default:
      modalità = "Risposta errata";
  }

  return {
    stato,
    dgfe,
    cassetto,
    scontrino,
    modalità,
  };
}
