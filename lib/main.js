"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const InjeolmiContract_1 = __importDefault(require("./contracts/InjeolmiContract"));
const Wallet_1 = __importDefault(require("./klaytn/Wallet"));
(async () => {
    skynode_1.BodyNode.append((0, skynode_1.el)("h1", "떡방앗간.닷컴"), (0, skynode_1.el)("p", "사이트가 아직도 개발중입니다."), (0, skynode_1.el)("footer", (0, skynode_1.el)("a", "트위터", { href: "https://twitter.com/ricecakemill", target: "_blank" }), "\n", (0, skynode_1.el)("a", "오카방 (오픈 카카오톡 방)", { href: "https://open.kakao.com/o/g1nYzIHd", target: "_blank" }), "\n", (0, skynode_1.el)("img", { src: "/images/thankyou.gif", height: "107.5" })));
    if (await Wallet_1.default.connected() !== true) {
        await Wallet_1.default.connect();
    }
    const owner = await Wallet_1.default.loadAddress();
    if (owner !== undefined) {
        console.log(await InjeolmiContract_1.default.balanceOf(owner));
    }
})();
//# sourceMappingURL=main.js.map