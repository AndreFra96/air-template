import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

type PrinterResponse = {
  success: boolean;
  code: string;
  status: number;
  statusText: string;
  additionalInfo?: Record<string, any>;
};

export class Printer {
  /**
   * Invia una richiesta alla stampante e raccoglie la risposta
   * @param address indirizzo dell'FP Mate della stampante (es. http://xxx.xxx.xxx.xxx/cgi-bin/fpmate.cgi)
   * @param body xml corpo della richiesta
   * @returns risposta della stampante
   */
  static async send(
    address: string,
    body: string,
    timeout: number = 5000
  ): Promise<PrinterResponse> {
    // create SOAP envelope
    const soap =
      '<?xml version="1.0" encoding="utf-8"?>\n' +
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\n' +
      "<s:Body>\n" +
      body +
      "</s:Body>\n" +
      "</s:Envelope>\n";

    const request = new Request(new URL(address), {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=UTF-8",
        "If-Modified-Since": "Thu, 01 Jan 1970 00:00:00 GMT",
        SOAPAction: '""',
      },
      body: soap,
    });
    try {
      const response = await fetchWithTimeout(request, timeout);
      const responseBody = await response.text();

      const xmlResponse = new window.DOMParser().parseFromString(
        responseBody,
        "text/xml"
      );

      return this.parsePrinterResponse(xmlResponse);
    } catch (e) {
      return {
        success: false,
        code: "FP_NO_ANSWER_NETWORK",
        status: 0,
        statusText: "0",
      };
    }
  }

  /**
   * Effettua il parsing della risposta della stampante
   * @param document documento XML della risposta
   * @returns risposta della stampante
   */
  static parsePrinterResponse(document: Document): PrinterResponse {
    const res = document.getElementsByTagName("response");
    if (!res || res.length <= 0)
      return {
        success: false,
        code: "FP_NO_ANSWER_NETWORK",
        status: 0,
        statusText: "0",
      };

    //Compongo la base della risposta
    const result: PrinterResponse = {
      success: /^(1|true)$/.test(res[0].getAttribute("success") || "false"),
      code: res[0].getAttribute("code") ?? "0",
      status: parseInt(res[0].getAttribute("status") || "0"),
      statusText: res[0].getAttribute("status") || "0",
    };

    //Aggiungo le informazioni aggiuntive
    const res_add = res[0].getElementsByTagName("addInfo");
    if (res_add.length > 0) {
      const list = res_add[0].getElementsByTagName("elementList");
      const tag_names_array = list[0].childNodes[0].nodeValue?.split(",") ?? [];
      const add_info: Record<string, any> = {};

      for (let tnai = 0; tnai < tag_names_array.length; tnai++) {
        const node = res_add[0].getElementsByTagName(tag_names_array[tnai])[0];
        const node_child = node.childNodes[0];
        add_info[tag_names_array[tnai]] = node_child.nodeValue ?? "";
      }
      result.additionalInfo = add_info;
    }

    return result;
  }
}
