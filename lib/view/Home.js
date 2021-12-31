"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const AirdropContract_1 = __importDefault(require("../contracts/AirdropContract"));
const FirstcomeAirdropContract_1 = __importDefault(require("../contracts/FirstcomeAirdropContract"));
const InjeolmiContract_1 = __importDefault(require("../contracts/InjeolmiContract"));
const InjeolmiPriceContract_1 = __importDefault(require("../contracts/InjeolmiPriceContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Home {
    constructor() {
        this.ijmPrice = ethers_1.BigNumber.from(0);
        this.container = (0, skynode_1.el)(".home-view", (0, skynode_1.el)("a.hardfork-button", "하드포크 허기", {
            click: () => ViewUtil_1.default.go("/hardpork"),
        }), (0, skynode_1.el)("h1", (0, msg_js_1.default)("TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("DESC_1"), "\n", (0, msg_js_1.default)("DESC_2"), "\n", (0, msg_js_1.default)("DESC_3")), (0, skynode_1.el)("h2", (0, msg_js_1.default)("INJEOLMI_TITLE")), (0, skynode_1.el)("img.logo", { src: "/images/injeolmi.png", height: "330" }), (0, skynode_1.el)("p", (0, msg_js_1.default)("INJEOLMI_DESC")), (0, skynode_1.el)("h3", (0, msg_js_1.default)("INJEOLMI_TOKENOMICS")), (0, skynode_1.el)("p", (0, msg_js_1.default)("INJEOLMI_TOKENOMICS_DESC_1")), (0, skynode_1.el)("p", (0, msg_js_1.default)("INJEOLMI_TOKENOMICS_DESC_2")), (0, skynode_1.el)("a", (0, msg_js_1.default)("DOWNLOAD_KAIKAS_BUTTON"), {
            href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi",
            target: "_blank",
        }), (0, skynode_1.el)(".card", (0, skynode_1.el)("h5", "하드포크 전 최종 인절미 가격"), (0, skynode_1.el)("h6", "0.144374553246136709 KLAY\n"), (this.firstcomeAirdropEvent = (0, skynode_1.el)(".event"))), (0, skynode_1.el)("h2", (0, msg_js_1.default)("WAREHOUSE_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("WAREHOUSE_DESC_1"), "\n", (0, msg_js_1.default)("WAREHOUSE_DESC_2")), (0, skynode_1.el)("a", (0, msg_js_1.default)("WAREHOUSE_ADDRESS"), "\nhttps://opensea.io/tteokmill", { href: "https://opensea.io/tteokmill", target: "_blank" }), (0, skynode_1.el)("h2", (0, msg_js_1.default)("SPARROW_NFT_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("SPARROW_NFT_DESC")), (0, skynode_1.el)("img.art", { src: "/images/nft/nft.jpg" }), (0, skynode_1.el)("p", (0, skynode_1.el)("a", (0, msg_js_1.default)("SPARROW_NFT_ADDRESS"), "\nhttps://opensea.io/collection/sparrow-nfts", { href: "https://opensea.io/collection/sparrow-nfts", target: "_blank" })), (0, skynode_1.el)("p", (0, skynode_1.el)("a", (0, msg_js_1.default)("MINT_SPARROW_NFT_BUTTON"), {
            click: () => ViewUtil_1.default.go("/mintnft"),
        })), (0, skynode_1.el)("h2", (0, msg_js_1.default)("FANGAME_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("FANGAME_DESC")), (0, skynode_1.el)("img", { src: "/images/game/flappy.png", height: "300" }), (0, skynode_1.el)("a.game-link", (0, msg_js_1.default)("FANGAME_1_BUTTON"), {
            href: "https://flappy-injeolmi.netlify.app/",
            target: "_blank",
        }), (0, skynode_1.el)("footer", (0, skynode_1.el)("a", (0, msg_js_1.default)("TWITTER_BUTTON"), {
            href: "https://twitter.com/tteokmill",
            target: "_blank",
        }), "\n", (0, skynode_1.el)("a", (0, msg_js_1.default)("KAKAOTALK_BUTTON"), {
            href: "https://open.kakao.com/o/g1nYzIHd",
            target: "_blank",
        }), "\n", (0, skynode_1.el)("img", { src: "/images/thankyou.gif", height: "107.5" }))).appendTo(skynode_1.BodyNode);
        this.refresh();
        this.interval = setInterval(() => this.refresh(), 2000);
    }
    async refresh() {
        this.ijmPrice = await InjeolmiPriceContract_1.default.price();
        const airdropBalance = await InjeolmiContract_1.default.balanceOf(AirdropContract_1.default.address);
        if (this.container.deleted !== true) {
        }
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const firstcomeAirdropBalance = await InjeolmiContract_1.default.balanceOf(FirstcomeAirdropContract_1.default.address);
            const airdropAmount = await FirstcomeAirdropContract_1.default.airdropAmount();
            if (firstcomeAirdropBalance.gte(airdropAmount)) {
                const season = await FirstcomeAirdropContract_1.default.season();
                const dropped = await FirstcomeAirdropContract_1.default.dropped(season, owner);
                if (this.container.deleted !== true) {
                    if (dropped === true) {
                        this.firstcomeAirdropEvent
                            .empty()
                            .appendText("선착순 떡돌리기 이벤트 참여 완료");
                    }
                    else {
                        this.firstcomeAirdropEvent.empty().append((0, skynode_1.el)("h5", "★☆ 선착순 떡돌리기 이벤트 진행중! ☆★"), (0, skynode_1.el)("a", "인절미 받기", {
                            click: async () => {
                                await FirstcomeAirdropContract_1.default.airdrop();
                            },
                        }));
                    }
                }
            }
        }
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map