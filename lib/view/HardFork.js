"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ArkContract_1 = __importDefault(require("../contracts/ArkContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class HardFork {
    constructor() {
        this.container = (0, skynode_1.el)(".hardfork-view", (0, skynode_1.el)("a", "< 뒤로가기", { click: () => ViewUtil_1.default.go("/") }), (0, skynode_1.el)("h1", "안녕하신가?\n 힘세고 강한 아침,\n 만일 내게 물어보면\n 나는 물레방아 하드포크"), this.ddd = (0, skynode_1.el)(".done"), (0, skynode_1.el)("p", "나는 한다. 강한 풀! 나는 한다. 딱풀!"), (0, skynode_1.el)("p.warning", "1. 절대로 하드포크 도중에 인절미를 다른 지갑에 옮겨선 안됨!!! 모두 잃어버릴 수 있음!!!\n3. 트랜잭션은 2번 발생됨\n2. 너의 지갑에 인절미 수량이 줄어들었다면, 이전이 잘 된 것이야"), (0, skynode_1.el)("a", { href: "https://medium.com/tteok/%EB%AC%BC%EB%A0%88%EB%B0%A9%EC%95%84-%ED%95%98%EB%93%9C%ED%8F%AC%ED%81%AC-%EC%9D%B8%EC%A0%88%EB%AF%B8-2-0-7bcfcd7f2b9a", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/hardInjeolmi.png" })), (0, skynode_1.el)("button", "기록했지? 인절미 이전하기", {
            click: async () => {
                if (await Wallet_1.default.connected() !== true) {
                    await Wallet_1.default.connect();
                }
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    await ArkContract_1.default.sendOld();
                }
            },
        })).appendTo(skynode_1.BodyNode);
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = HardFork;
//# sourceMappingURL=HardFork.js.map