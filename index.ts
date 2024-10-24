"use strict";

/**
 *
 * @param request               new XMLHttpRequest()
 * @param sourceText            Source text to be transliterated.
 * @param inputLanguageCode     Language code, for e.g. ne-t-i0-und for Nepal.
 * @param maxResult             Max number of transliterated results.
 * @return {Promise<any>}
 */
export default function transliterate(
  request: XMLHttpRequest,
  sourceText: string,
  inputLanguageCode: string,
  maxResult: number
): Promise<[string, string][]> {
  return new Promise((resolve, reject) => {
    /*
     * Match all alphanumeric with latin characters
     */
    const alphanumericWithLatin = sourceText.match(
      /[A-Za-z0-9\u00C0-\u024F\u1E00-\u1EFF]+/
    );

    if (alphanumericWithLatin === null) {
      return;
    }

    const alphaNumText = alphanumericWithLatin[0];
    const sourceTextParts = sourceText.split(alphaNumText);
    const firstPartBeforeText = sourceTextParts[0];
    const lastPartAfterText = sourceTextParts[1];

    const encodedUrl = encodeURI(
      "https://inputtools.google.com/request?text=" +
        alphaNumText +
        "&itc=" +
        inputLanguageCode +
        "&num=" +
        maxResult +
        "&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage"
    );

    // Do the usual XHR stuff
    request.open("GET", encodedUrl);

    request.onreadystatechange = function () {
      // Only proceed when the request is done (readyState === 4)
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          try {
            const responseJson = JSON.parse(this.responseText);

            if (!responseJson[1] || !responseJson[1][0]) {
              return;
            }

            const responseList = responseJson[1][0][1];

            resolve(
              responseList.map((response: string) => [
                firstPartBeforeText + response + lastPartAfterText,
                response,
              ])
            );
          } catch (error) {
            reject("Error parsing response JSON: " + error);
          }
        } else {
          reject("Rejected status code: " + request.status);
        }
      }
    };

    request.onerror = function () {
      reject(Error("Network Error"));
    };

    request.send();
  });
}
