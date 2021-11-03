"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Airdrop_json_1 = __importDefault(require("./abi/artifacts/contracts/Airdrop.sol/Airdrop.json"));
const KIP7Contract_1 = __importDefault(require("./standard/KIP7Contract"));
class AirdropContract extends KIP7Contract_1.default {
    constructor() {
        super("0x05f2b0c56826f4244525d96C0004CB0032CD9709", Airdrop_json_1.default.abi);
    }
}
exports.default = new AirdropContract();
//# sourceMappingURL=AirdropContract.js.map