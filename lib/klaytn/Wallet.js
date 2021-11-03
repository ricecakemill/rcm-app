"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventcontainer_1 = __importDefault(require("eventcontainer"));
const ExtWallet_1 = __importDefault(require("./ExtWallet"));
class Wallet extends eventcontainer_1.default {
    constructor() {
        super();
        this.checkConnected();
    }
    async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }
    async loadAddress() {
        if (ExtWallet_1.default.installed === true) {
            return await ExtWallet_1.default.loadAddress();
        }
    }
    async connected() {
        return await this.loadAddress() !== undefined;
    }
    async connect() {
        if (ExtWallet_1.default.installed === true) {
            return await ExtWallet_1.default.connect();
        }
        else {
            alert("카이카스가 필요합니다. 카이카스를 설치해주시기 바랍니다.");
        }
    }
}
exports.default = new Wallet();
//# sourceMappingURL=Wallet.js.map