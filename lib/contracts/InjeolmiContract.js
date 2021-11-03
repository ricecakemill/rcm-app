"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Injeolmi_json_1 = __importDefault(require("./abi/artifacts/contracts/Injeolmi.sol/Injeolmi.json"));
const KIP7Contract_1 = __importDefault(require("./standard/KIP7Contract"));
class InjeolmiContract extends KIP7Contract_1.default {
    constructor() {
        super("0x215A86F9215a7A0592118c45a87C168c1A1b3C75", Injeolmi_json_1.default.abi);
    }
}
exports.default = new InjeolmiContract();
//# sourceMappingURL=InjeolmiContract.js.map