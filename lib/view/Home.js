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
const InjeolmiPoolContract_1 = __importDefault(require("../contracts/InjeolmiPoolContract"));
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
        })), (0, skynode_1.el)("p.warning", (0, msg_js_1.default)("WRONG_TRANSFER_WARNING")), (0, skynode_1.el)(".card", (0, skynode_1.el)("h5", (0, msg_js_1.default)("INJEOLMI_PRICE")), (0, skynode_1.el)("h6", (this.priceDisplay = (0, skynode_1.el)("span.price", "...")), " KLAY\n"), (0, skynode_1.el)("h5", (0, msg_js_1.default)("INJEOLMI_AIRDROP_AMOUNT")), (0, skynode_1.el)("h6", (this.airdropDisplay = (0, skynode_1.el)("span.price", "...")), " IJM\n"), (this.firstcomeAirdropEvent = (0, skynode_1.el)(".event"))), (0, skynode_1.el)("h3", (0, msg_js_1.default)("BUY_INJEOLMI_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("BUY_INJEOLMI_DESC")), (0, skynode_1.el)(".form", this.buyInput = (0, skynode_1.el)("input", {
            placeholder: (0, msg_js_1.default)("KLAY_AMOUNT"),
            keyup: () => setTimeout(() => {
                const value = ethers_1.utils.parseEther(this.buyInput.domElement.value);
                this.buyResult.empty().appendText(`대략 ${ethers_1.utils.formatEther(value.mul(ethers_1.utils.parseEther("1")).div(this.ijmPrice).mul(9).div(10))} IJM`);
            }),
        }), this.buyResult = (0, skynode_1.el)(".result"), (0, skynode_1.el)("button", (0, msg_js_1.default)("BUY_INJEOLMI_BUTTON"), {
            click: async () => {
                await InjeolmiPoolContract_1.default.swapToIJM(ethers_1.utils.parseEther(this.buyInput.domElement.value));
            },
        })), (0, skynode_1.el)("h3", (0, msg_js_1.default)("SELL_INJEOLMI_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("SELL_INJEOLMI_DESC")), (0, skynode_1.el)(".form", this.sellInput = (0, skynode_1.el)("input", {
            placeholder: (0, msg_js_1.default)("IMJ_AMOUNT"),
            keyup: () => setTimeout(() => {
                const value = ethers_1.utils.parseEther(this.sellInput.domElement.value);
                this.sellResult.empty().appendText(`대략 ${ethers_1.utils.formatEther(value.mul(this.ijmPrice).div(ethers_1.utils.parseEther("1")).mul(9).div(10))} KLAY`);
            }),
        }), this.sellResult = (0, skynode_1.el)(".result"), (0, skynode_1.el)("button", (0, msg_js_1.default)("SELL_INJEOLMI_BUTTON"), {
            click: async () => {
                await InjeolmiPoolContract_1.default.swapToKlay(ethers_1.utils.parseUnits(this.sellInput.domElement.value, 8));
            },
        })), (0, skynode_1.el)("h2", (0, msg_js_1.default)("WAREHOUSE_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("WAREHOUSE_DESC_1"), "\n", (0, msg_js_1.default)("WAREHOUSE_DESC_2")), (0, skynode_1.el)("a", (0, msg_js_1.default)("WAREHOUSE_ADDRESS"), "\nhttps://opensea.io/tteokmill", { href: "https://opensea.io/tteokmill", target: "_blank" }), (0, skynode_1.el)("h2", (0, msg_js_1.default)("SPARROW_NFT_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("SPARROW_NFT_DESC")), (0, skynode_1.el)("img.art", { src: "/images/nft/nft.jpg" }), (0, skynode_1.el)("p", (0, skynode_1.el)("a", (0, msg_js_1.default)("SPARROW_NFT_ADDRESS"), "\nhttps://opensea.io/collection/sparrow-nfts", { href: "https://opensea.io/collection/sparrow-nfts", target: "_blank" })), (0, skynode_1.el)("p", (0, skynode_1.el)("a", (0, msg_js_1.default)("MINT_SPARROW_NFT_BUTTON"), {
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
            this.priceDisplay.empty().appendText(ethers_1.utils.formatEther(this.ijmPrice));
            this.airdropDisplay.empty().appendText(ethers_1.utils.formatUnits(airdropBalance, 8));
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