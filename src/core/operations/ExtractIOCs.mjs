/**
 * @author matthijsvp [matthijs@vanpolen.biz]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation";
//import OperationError from "../errors/OperationError";
import { search, URL_REGEX } from "../lib/Extract";

/**
 * Extract IOCs operation
 */
class ExtractIOCs extends Operation {

    /**
     * ExtractIOCs constructor
     */
    constructor() {
        super();

        this.name = "Extract IOCs";
        this.module = "Default";
        this.description = "Extracts Domains, IPs, URLs from the input.";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Refang text first",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [refangFirst] = args;
        const DOMAIN_REGEX_EXCL = /(?:(^|\s))(((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}(?=\s))/gmi;
        //const DOMAIN_REGEX_EXCL = /\s(?!:\/\/)[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/ig;
        const IPv4 = /(?:(?:\d|[01]?\d\d|2[0-4]\d|25[0-5])\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d|\d)(?:\/\d{1,2})?/gi;

        if (refangFirst): {
            input = input.replace("hxxp", "http");
        }

        let result = "DOMAINS\n=======\n";

        const temp = search(input, DOMAIN_REGEX_EXCL);
        let arr = temp.split("\n");
        arr = arr.map(item => item.trim());
        arr = arr.filter(item => !!item);

        result += arr.join("\n") + "\n\n";
        result += "URLS\n====\n" + search(input, URL_REGEX) + "\n";
        result += "IPv4\n====\n" + search(input, IPv4) + "\n";

        return result;
    }

}

export default ExtractIOCs;
