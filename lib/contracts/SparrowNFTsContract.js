"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const SparrowNFTs_json_1 = __importDefault(require("./abi/sparrow-nfts/artifacts/contracts/SparrowNFTs.sol/SparrowNFTs.json"));
const KIP7Contract_1 = __importDefault(require("./standard/KIP7Contract"));
class SparrowNFTsContract extends KIP7Contract_1.default {
    constructor() {
        super("0xfe1970e7fBa02C2ab7721840eCA0277d5eE6b482", SparrowNFTs_json_1.default.abi);
    }
    async current() {
        return bignumber_1.BigNumber.from(await this.runMethod("current"));
    }
    async minters(id) {
        return await this.runMethod("minters", id);
    }
    async mint(extname, title, description, amount) {
        await this.runWalletMethod("mint", extname, title, description, amount);
    }
}
exports.default = new SparrowNFTsContract();
//# sourceMappingURL=SparrowNFTsContract.js.map