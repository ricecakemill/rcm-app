"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Injeolmi_json_1 = __importDefault(require("./abi/artifacts/contracts/Injeolmi.sol/Injeolmi.json"));
const KIP7Contract_1 = __importDefault(require("./standard/KIP7Contract"));
class InjeolmiContract extends KIP7Contract_1.default {
    constructor() {
        super("0x05f2b0c56826f4244525d96C0004CB0032CD9709", Injeolmi_json_1.default.abi);
    }
}
exports.default = new InjeolmiContract();
//# sourceMappingURL=InjeolmiContract%20copy.js.map