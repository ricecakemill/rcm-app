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
        this.container = (0, skynode_1.el)(".hardfork-view", (0, skynode_1.el)("a", "< 뒤로가기", { click: () => ViewUtil_1.default.go("/") }), (0, skynode_1.el)("h1", "안녕하신가?\n 힘세고 강한 아침,\n 만일 내게 물어보면\n 나는 물레방아 하드포크"), this.ddd = (0, skynode_1.el)(".done"), (0, skynode_1.el)("p", "나는 한다. 강한 풀! 나는 한다. 딱풀!"), (0, skynode_1.el)("p.warning", "절대로 하드포크 도중에 인절미를 다른 지갑에 옮겨선 안됨!!! 모두 잃어버릴 수 있음!!!"), (0, skynode_1.el)("a", { href: "https://medium.com/tteok/%EB%AC%BC%EB%A0%88%EB%B0%A9%EC%95%84-%ED%95%98%EB%93%9C%ED%8F%AC%ED%81%AC-%EC%9D%B8%EC%A0%88%EB%AF%B8-2-0-7bcfcd7f2b9a", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/hardInjeolmi.png" })), (0, skynode_1.el)("button", "나는 한다. 나의 인절미를 기록.", {
            click: async () => {
                if (await Wallet_1.default.connected() !== true) {
                    await Wallet_1.default.connect();
                }
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    if ((await ArkContract_1.default.records(owner)).eq(0)) {
                        await ArkContract_1.default.record();
                        setTimeout(() => {
                            alert("기록 완료 ㅊㅋㅊㅋㅊ 4일부터 6일까지 이전 기간이니 반드시 또오셈!!~!@~!@~!@~!@");
                        }, 2000);
                    }
                    else {
                        alert("이미 기록함");
                    }
                }
            },
        })).appendTo(skynode_1.BodyNode);
        this.load();
        Wallet_1.default.on("connect", () => this.load());
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await ArkContract_1.default.records(owner)).gt(0)) {
                this.ddd.empty().appendText("참새야! 너 이미 기록했어! 걱정 안해도 뎌! 4일에서 6일 사이에 다시와서 이전 꼭 해!!");
            }
        }
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = HardFork;
//# sourceMappingURL=HardFork.js.map