"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InjeolmiPool_json_1 = __importDefault(require("./abi/artifacts/contracts/InjeolmiPool.sol/InjeolmiPool.json"));
const KIP7Contract_1 = __importDefault(require("./standard/KIP7Contract"));
class InjeolmiPoolContract extends KIP7Contract_1.default {
    constructor() {
        super("0xfABD2A8482c4Da6361e5B801538d937CC0BD21C1", InjeolmiPool_json_1.default.abi);
    }
}
exports.default = new InjeolmiPoolContract();
//# sourceMappingURL=InjeolmiPoolContract.js.map