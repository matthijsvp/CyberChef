/**
 * @author matthijsvp [matthijs@vanpolen.biz]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation";
import OperationError from "../errors/OperationError";

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
        let result = ""
        result = search(input, DOMAIN_REGEX);
        result = result + search(input, URL_REGEX)
        return result;
        throw new OperationError("Test");
    }

}

export default ExtractIOCs;
