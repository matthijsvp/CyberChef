/**
 * @author matthijsvp [matthijs@vanpolen.biz]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation";
import OperationError from "../errors/OperationError";
import { search, DOMAIN_REGEX, URL_REGEX } from "../lib/Extract";

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
            /* Example arguments. See the project wiki for full details.
            {
                name: "First arg",
                type: "string",
                value: "Don't Panic"
            },
            {
                name: "Second arg",
                type: "number",
                value: 42
            }
            */
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        // const [firstArg, secondArg] = args;
        const DOMAIN_REGEX_EXCL = /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/ig;
        //const DOMAIN_REGEX_EXCL = /\s(?!:\/\/)[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/ig;
        const IPv4 = /(?:(?:\d|[01]?\d\d|2[0-4]\d|25[0-5])\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d|\d)(?:\/\d{1,2})?/gi;

        let result = "DOMAINS\n=======\n";
        result = result + search(input, DOMAIN_REGEX_EXCL) + "\n";
        result = result + "URLS\n====\n" + search(input, URL_REGEX) + "\n";
        result = result + "IPv4\n====\n" + search(input, IPv4) + "\n";

        return result;
        throw new OperationError("Test");
    }

}

export default ExtractIOCs;
