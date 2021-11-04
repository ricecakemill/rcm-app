"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const AirdropContract_1 = __importDefault(require("./contracts/AirdropContract"));
const InjeolmiContract_1 = __importDefault(require("./contracts/InjeolmiContract"));
const InjeolmiPoolContract_1 = __importDefault(require("./contracts/InjeolmiPoolContract"));
const Wallet_1 = __importDefault(require("./klaytn/Wallet"));
(async () => {
    let priceDisplay;
    let airdropDisplay;
    let ijmPrice;
    let buyInput;
    let buyResult;
    let sellInput;
    let sellResult;
    skynode_1.BodyNode.append((0, skynode_1.el)("h1", "떡방앗간.닷컴"), (0, skynode_1.el)("p", "사이트가 아직도 개발중입니다. 일단 인절미부터 오픈~~"), (0, skynode_1.el)("h2", "인절미"), (0, skynode_1.el)("img", { src: "/images/injeolmi.png", height: "330" }), (0, skynode_1.el)("p", "우리나라에는 새로 이사를 오면 떡을 돌리는 풍습이 있습니다. 이런 \"떡돌리기\" 문화를 토크노믹스로 만들어 보았습니다. 한국인의 정과 훈훈한 인심을 느껴보세요."), (0, skynode_1.el)("h3", "인절미 떡크노믹스"), (0, skynode_1.el)("p", "토큰 전송 시 10% 떼감 -> 9%는 홀더들한테 떡돌림, 1%는 떡방앗간에 팁으로 제공 (팁은 이벤트, 에드, 기부, 개발자 사리사욕에 쓰임)"), (0, skynode_1.el)("a", "인절미 카이카스 지갑에 추가 (클립은 영원히 지원 계획이 없습니다.)", {
        click: () => Wallet_1.default.addToken(InjeolmiContract_1.default.address, "IJM", 8, "https://raw.githubusercontent.com/ricecakemill/rcm-app/main/docs/images/injeolmi.png"),
    }), (0, skynode_1.el)("p", "인절미 가격 = ", priceDisplay = (0, skynode_1.el)("span", "..."), " KLAY\n", "남은 에어드롭 물량 = ", airdropDisplay = (0, skynode_1.el)("span", "..."), " IJM"), (0, skynode_1.el)("h3", "클레이로 인절미 사기"), (0, skynode_1.el)("p", "인절미를 살때도 떡크노믹스 때문에 10%를 적게 받습니다."), (0, skynode_1.el)(".form", buyInput = (0, skynode_1.el)("input", { placeholder: "KLAY 수량" }, {
        keyup: () => {
            const value = ethers_1.utils.parseEther(buyInput.domElement.value);
            buyResult.empty().appendText(`대략 ${ethers_1.utils.formatEther(value.mul(ethers_1.utils.parseEther("1")).div(ijmPrice).mul(9).div(10))} IJM`);
        },
    }), buyResult = (0, skynode_1.el)(".result"), (0, skynode_1.el)("button", "사기", {
        click: async () => {
            await InjeolmiPoolContract_1.default.swapToIJM(ethers_1.utils.parseEther(buyInput.domElement.value));
        },
    })), (0, skynode_1.el)("h3", "인절미 클레이로 팔기"), (0, skynode_1.el)("p", "인절미를 펄때도 떡크노믹스 때문에 10%를 적게 받습니다."), (0, skynode_1.el)(".form", sellInput = (0, skynode_1.el)("input", { placeholder: "IJM 수량" }, {
        keyup: () => {
            const value = ethers_1.utils.parseEther(sellInput.domElement.value);
            sellResult.empty().appendText(`대략 ${ethers_1.utils.formatEther(value.mul(ijmPrice).div(ethers_1.utils.parseEther("1")).mul(9).div(10))} KLAY`);
        },
    }), sellResult = (0, skynode_1.el)(".result"), (0, skynode_1.el)("button", "팔기", {
        click: async () => {
            await InjeolmiPoolContract_1.default.swapToKlay(ethers_1.utils.parseUnits(sellInput.domElement.value, 8));
        },
    })), (0, skynode_1.el)("h2", "떡 NFT"), (0, skynode_1.el)("p", "떡 NFT(KIP-37) 발행 예정입니다. 순수 2차 창작물로 발행되며 창작자에게 발행된 NFT를 전량 전달합니다. 떡 NFT는 Klubs가 출시되면 Klubs에 배포됩니다."), (0, skynode_1.el)("img", { src: "/images/nft/nft.jpg" }), (0, skynode_1.el)("footer", (0, skynode_1.el)("a", "트위터", { href: "https://twitter.com/ricecakemill", target: "_blank" }), "\n", (0, skynode_1.el)("a", "오카방 (오픈 카카오톡 방)", { href: "https://open.kakao.com/o/g1nYzIHd", target: "_blank" }), "\n", (0, skynode_1.el)("img", { src: "/images/thankyou.gif", height: "107.5" })));
    if (await Wallet_1.default.connected() !== true) {
        await Wallet_1.default.connect();
    }
    const ijmBalance = await InjeolmiContract_1.default.balanceOf(InjeolmiPoolContract_1.default.address);
    const klayBalance = await Wallet_1.default.balanceOf(InjeolmiPoolContract_1.default.address);
    if (klayBalance !== undefined) {
        ijmPrice = klayBalance.mul(ethers_1.utils.parseUnits("1", 8)).div(ijmBalance);
        priceDisplay.empty().appendText(ethers_1.utils.formatEther(ijmPrice));
    }
    airdropDisplay.empty().appendText(ethers_1.utils.formatUnits(await InjeolmiContract_1.default.balanceOf(AirdropContract_1.default.address), 8));
})();
//# sourceMappingURL=main.js.map