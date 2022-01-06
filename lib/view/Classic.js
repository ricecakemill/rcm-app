"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const InjeolmiContract_1 = __importDefault(require("../contracts/InjeolmiContract"));
const InjeolmiPoolContract_1 = __importDefault(require("../contracts/InjeolmiPoolContract"));
const InjeolmiPriceContract_1 = __importDefault(require("../contracts/InjeolmiPriceContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
class Classic {
    constructor() {
        this.ijmPrice = ethers_1.BigNumber.from(0);
        this.container = (0, skynode_1.el)(".home-view", (0, skynode_1.el)("h1", "인절미 클래식"), (0, skynode_1.el)("img.logo", { src: "/images/injeolmi-classic.png", height: "330" }), (0, skynode_1.el)("p", (0, msg_js_1.default)("INJEOLMI_DESC")), (0, skynode_1.el)("h3", "인절미 클래식 떡크노믹스"), (0, skynode_1.el)("p", (0, msg_js_1.default)("INJEOLMI_TOKENOMICS_DESC_1")), (0, skynode_1.el)("p", "인절미 클래식은 클레이튼 밈 토큰입니다. 따라서 클레이튼 지갑인 카이카스 지갑이 필요합니다."), (0, skynode_1.el)("a", (0, msg_js_1.default)("DOWNLOAD_KAIKAS_BUTTON"), {
            href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi",
            target: "_blank",
        }), (0, skynode_1.el)(".links", (0, skynode_1.el)("a", (0, msg_js_1.default)("ADD_INJEOLMI_TO_WALLET_BUTTON"), {
            click: () => Wallet_1.default.addToken(InjeolmiContract_1.default.address, "IJM", 8, "https://raw.githubusercontent.com/tteokmill/tteok-app/main/docs/images/injeolmi.png"),
        }), "\n", (0, skynode_1.el)("a", (0, msg_js_1.default)("INJEOLMI_CONTRACT_BUTTON"), {
            href: "https://scope.klaytn.com/token/0x9CFc059F64D664F92f3d0329844B8ccca4E5215B",
            target: "_blank",
        }), "\n", (0, skynode_1.el)("a", (0, msg_js_1.default)("INJEOLMI_SOURCE_CODE_BUTTON"), {
            href: "https://github.com/tteokmill/injeolmi",
            target: "_blank",
        }), "\n", (0, skynode_1.el)("a", (0, msg_js_1.default)("INJEOLMI_CHART_BUTTON"), {
            href: "https://dexata.kr/?tokenA=0x9cfc059f64d664f92f3d0329844b8ccca4e5215b&tokenB=0x0000000000000000000000000000000000000000",
            target: "_blank",
        })), (0, skynode_1.el)("p.warning", "절대 본인의 인절미 클래식을 본인의 지갑에 전송하지 마세요. 인절미 클래식을 모두 잃어버릴 수 있습니다!"), (0, skynode_1.el)(".card", (0, skynode_1.el)("h5", "인절미 클래식 가격"), (0, skynode_1.el)("h6", (this.priceDisplay = (0, skynode_1.el)("span.price", "...")), " KLAY\n")), (0, skynode_1.el)("h3", "클레이로 인절미 클래식 사기"), (0, skynode_1.el)("p", "인절미 클래식을 살때도 떡크노믹스 때문에 10%를 적게 받습니다."), (0, skynode_1.el)(".form", this.buyInput = (0, skynode_1.el)("input", {
            placeholder: (0, msg_js_1.default)("KLAY_AMOUNT"),
            keyup: () => setTimeout(() => {
                const value = ethers_1.utils.parseEther(this.buyInput.domElement.value);
                this.buyResult.empty().appendText(`대략 ${ethers_1.utils.formatEther(value.mul(ethers_1.utils.parseEther("1")).div(this.ijmPrice).mul(9).div(10))} IJM`);
            }),
        }), this.buyResult = (0, skynode_1.el)(".result"), (0, skynode_1.el)("button", (0, msg_js_1.default)("BUY_INJEOLMI_BUTTON"), {
            click: async () => {
                await InjeolmiPoolContract_1.default.swapToIJM(ethers_1.utils.parseEther(this.buyInput.domElement.value));
            },
        })), (0, skynode_1.el)("h3", "인절미 클래식 클레이로 팔기"), (0, skynode_1.el)("p", "인절미 클래식을 펄때도 떡크노믹스 때문에 10%를 적게 받습니다."), (0, skynode_1.el)(".form", this.sellInput = (0, skynode_1.el)("input", {
            placeholder: (0, msg_js_1.default)("IMJ_AMOUNT"),
            keyup: () => setTimeout(() => {
                const value = ethers_1.utils.parseEther(this.sellInput.domElement.value);
                this.sellResult.empty().appendText(`대략 ${ethers_1.utils.formatEther(value.mul(this.ijmPrice).div(ethers_1.utils.parseEther("1")).mul(9).div(10))} KLAY`);
            }),
        }), this.sellResult = (0, skynode_1.el)(".result"), (0, skynode_1.el)("button", (0, msg_js_1.default)("SELL_INJEOLMI_BUTTON"), {
            click: async () => {
                await InjeolmiPoolContract_1.default.swapToKlay(ethers_1.utils.parseUnits(this.sellInput.domElement.value, 8));
            },
        })), (0, skynode_1.el)("footer", (0, skynode_1.el)("a", (0, msg_js_1.default)("TWITTER_BUTTON"), {
            href: "https://twitter.com/tteokclassic",
            target: "_blank",
        }), "\n", (0, skynode_1.el)("a", (0, msg_js_1.default)("KAKAOTALK_BUTTON"), {
            href: "https://open.kakao.com/o/gc5NMySd",
            target: "_blank",
        }), "\n", (0, skynode_1.el)("img", { src: "/images/thankyou.gif", height: "107.5" }))).appendTo(skynode_1.BodyNode);
        this.refresh();
        this.interval = setInterval(() => this.refresh(), 2000);
        this.ddd();
    }
    async ddd() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
    }
    async refresh() {
        this.ijmPrice = await InjeolmiPriceContract_1.default.price();
        if (this.container.deleted !== true) {
            this.priceDisplay.empty().appendText(ethers_1.utils.formatEther(this.ijmPrice));
        }
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Classic;
//# sourceMappingURL=Classic.js.map