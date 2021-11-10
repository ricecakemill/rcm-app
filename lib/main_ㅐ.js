"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const AirdropContract_1 = __importDefault(require("./contracts/AirdropContract"));
const FirstcomeAirdropContract_1 = __importDefault(require("./contracts/FirstcomeAirdropContract"));
const InjeolmiContract_1 = __importDefault(require("./contracts/InjeolmiContract"));
const InjeolmiPoolContract_1 = __importDefault(require("./contracts/InjeolmiPoolContract"));
const InjeolmiPriceContract_1 = __importDefault(require("./contracts/InjeolmiPriceContract"));
const Wallet_1 = __importDefault(require("./klaytn/Wallet"));
(async () => {
    let priceDisplay;
    let airdropDisplay;
    let firstcomeAirdropEvent;
    let ijmPrice;
    let buyInput;
    let buyResult;
    let sellInput;
    let sellResult;
    let carousel;
    let index = 0;
    skynode_1.BodyNode.append((0, skynode_1.el)("h1", "떡방앗간.닷컴"), (0, skynode_1.el)("p", "한국인의 정과 훈훈한 인심. 따뜻한 코인 커뮤니티 떡방앗간 코인 이야기. \n", (0, skynode_1.el)("a", "http://ricecakemill.com", {
        href: "http://ricecakemill.com",
        target: "_blank",
    }), "으로도 접속하실 수 있습니다.\n떡방앗간 회원들은 \"참새\"로 불리웁니다."), (0, skynode_1.el)("h2", "인절미"), (0, skynode_1.el)("img.logo", { src: "/images/injeolmi.png", height: "330" }), (0, skynode_1.el)("p", '우리나라에는 새로 이사를 오면 떡을 돌리는 풍습이 있습니다. 이런 "떡돌리기" 문화를 토크노믹스로 만들어 보았습니다. 한국인의 정과 훈훈한 인심을 느껴보세요.'), (0, skynode_1.el)("h3", "인절미 떡크노믹스"), (0, skynode_1.el)("p", "토큰 전송 시 10% 떼감 -> 9%는 홀더들한테 떡돌림, 1%는 떡방앗간에 팁으로 제공 (팁은 이벤트, 에드, 기부, 개발자 사리사욕에 쓰임)"), (0, skynode_1.el)("p", "인절미는 클레이튼 최초의 밈 토큰입니다. 따라서 클레이튼 지갑인 ", (0, skynode_1.el)("a", "카이카스 지갑", {
        href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi",
        target: "_blank",
    }), "이 필요합니다."), (0, skynode_1.el)(".links", (0, skynode_1.el)("a", "인절미 카이카스 지갑에 추가", {
        click: () => Wallet_1.default.addToken(InjeolmiContract_1.default.address, "IJM", 8, "https://raw.githubusercontent.com/ricecakemill/rcm-app/main/docs/images/injeolmi.png"),
    }), (0, skynode_1.el)("span.danger", "(클립은 영원히 지원 계획이 없습니다.)"), "\n", (0, skynode_1.el)("a", "스마트 콘트랙트 주소: 0x9CFc059F64D664F92f3d0329844B8ccca4E5215B", {
        href: "https://scope.klaytn.com/token/0x9CFc059F64D664F92f3d0329844B8ccca4E5215B",
        target: "_blank",
    }), "\n", (0, skynode_1.el)("a", "소스 코드", {
        href: "https://github.com/ricecakemill/injeolmi",
        target: "_blank",
    }), "\n", (0, skynode_1.el)("a", "차트 보기", {
        href: "https://dexata.kr/?tokenA=0x9cfc059f64d664f92f3d0329844b8ccca4e5215b&tokenB=0x0000000000000000000000000000000000000000",
        target: "_blank",
    })), (0, skynode_1.el)("p.warning", "절대 본인의 인절미를 본인의 지갑에 전송하지 마세요. 인절미를 모두 잃어버릴 수 있습니다!"), (0, skynode_1.el)(".card", (0, skynode_1.el)("h5", "인절미 가격"), (0, skynode_1.el)("h6", (priceDisplay = (0, skynode_1.el)("span.price", "...")), " KLAY\n"), (0, skynode_1.el)("h5", "에어드롭 물량"), (0, skynode_1.el)("h6", (airdropDisplay = (0, skynode_1.el)("span.price", "...")), " IJM\n"), (firstcomeAirdropEvent = (0, skynode_1.el)(".event"))), (0, skynode_1.el)("h3", "클레이로 인절미 사기"), (0, skynode_1.el)("p", "인절미를 살때도 떡크노믹스 때문에 10%를 적게 받습니다."), (0, skynode_1.el)(".form", (buyInput = (0, skynode_1.el)("input", { placeholder: "KLAY 수량" }, {
        keyup: () => {
            setTimeout(() => {
                const value = ethers_1.utils.parseEther(buyInput.domElement.value);
                buyResult
                    .empty()
                    .appendText(`대략 ${ethers_1.utils.formatEther(value.mul(ethers_1.utils.parseEther("1")).div(ijmPrice).mul(9).div(10))} IJM`);
            });
        },
    })), (buyResult = (0, skynode_1.el)(".result")), (0, skynode_1.el)("button", "사기", {
        click: async () => {
            await InjeolmiPoolContract_1.default.swapToIJM(ethers_1.utils.parseEther(buyInput.domElement.value));
        },
    })), (0, skynode_1.el)("h3", "인절미 클레이로 팔기"), (0, skynode_1.el)("p", "인절미를 팔때도 떡크노믹스 때문에 10%를 적게 받습니다."), (0, skynode_1.el)(".form", (sellInput = (0, skynode_1.el)("input", { placeholder: "IJM 수량" }, {
        keyup: () => {
            setTimeout(() => {
                const value = ethers_1.utils.parseEther(sellInput.domElement.value);
                sellResult
                    .empty()
                    .appendText(`대략 ${ethers_1.utils.formatEther(value.mul(ijmPrice).div(ethers_1.utils.parseEther("1")).mul(9).div(10))} KLAY`);
            });
        },
    })), (sellResult = (0, skynode_1.el)(".result")), (0, skynode_1.el)("button", "펄기", {
        click: async () => {
            await InjeolmiPoolContract_1.default.swapToKlay(ethers_1.utils.parseUnits(sellInput.domElement.value, 8));
        },
    })), (0, skynode_1.el)("h2", "떡방앗간 곳간"), (0, skynode_1.el)("p", "곳간은 떡방앗간 코인 이야기의 자산들이 보관된 곳입니다.\n어디에도 주거나 팔지 않고 영원히 간직됩니다."), (0, skynode_1.el)("a", "곳간 주소\nhttps://opensea.io/ricecakemill", { href: "https://opensea.io/ricecakemill", target: "_blank" }), (0, skynode_1.el)("h2", "떡 NFT"), (0, skynode_1.el)("p", "떡 NFT(KIP-37) 발행 예정입니다. 순수 2차 창작물로 발행되며 만든 참새에게 발행된 NFT를 전량 전달합니다. 떡 NFT는 Klubs가 출시되면 Klubs에 배포됩니다."), (0, skynode_1.el)(".carousel-container", (carousel = (0, skynode_1.el)(".carousel", (0, skynode_1.el)("img.art", { src: "/images/nft/nft.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/01.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/02.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/03.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/04.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/05.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/06.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/07.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/09.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/10.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/11.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/12.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/13.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/14.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/15.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/16.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/17.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/18.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/19.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/20.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/21.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/22.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/23.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/24.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/25.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/26.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/27.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/29.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/29.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/30.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/31.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/32.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/33.jpg" }), (0, skynode_1.el)("img.art", { src: "/images/nft/34.jpg" })))), (0, skynode_1.el)("button.prev", "< 이전", {
        click: () => {
            if (index === 0)
                return;
            index -= 1;
            carousel.style({
                transform: `translate3d(-${560 * index}px, 0, 0)`,
            });
        },
    }), (0, skynode_1.el)("button.next", "다음 >", {
        click: () => {
            if (index === 25)
                return;
            index += 1;
            carousel.style({
                transform: `translate3d(-${560 * index}px, 0, 0)`,
            });
        },
    }), (0, skynode_1.el)("h2", "떡방앗간 팬게임"), (0, skynode_1.el)("p", "참새들이 만든 떡방앗간 팬게임입니다."), (0, skynode_1.el)("img", { src: "/images/game/flappy.png", height: "300" }), (0, skynode_1.el)("a.game-link", "플래피 인절미", {
        href: "https://flappy-injeolmi.netlify.app/",
        target: "_blank",
    }), (0, skynode_1.el)("footer", (0, skynode_1.el)("a", "트위터", {
        href: "https://twitter.com/ricecakemill",
        target: "_blank",
    }), "\n", (0, skynode_1.el)("a", "오카방 (오픈 카카오톡 방)", {
        href: "https://open.kakao.com/o/g1nYzIHd",
        target: "_blank",
    }), "\n", (0, skynode_1.el)("img", { src: "/images/thankyou.gif", height: "107.5" })));
    const refresh = async () => {
        ijmPrice = await InjeolmiPriceContract_1.default.price();
        priceDisplay.empty().appendText(ethers_1.utils.formatEther(ijmPrice));
        const airdropBalance = await InjeolmiContract_1.default.balanceOf(AirdropContract_1.default.address);
        airdropDisplay.empty().appendText(ethers_1.utils.formatUnits(airdropBalance, 8));
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const firstcomeAirdropBalance = await InjeolmiContract_1.default.balanceOf(FirstcomeAirdropContract_1.default.address);
            const airdropAmount = await FirstcomeAirdropContract_1.default.airdropAmount();
            if (firstcomeAirdropBalance.gte(airdropAmount)) {
                const season = await FirstcomeAirdropContract_1.default.season();
                const dropped = await FirstcomeAirdropContract_1.default.dropped(season, owner);
                if (dropped === true) {
                    firstcomeAirdropEvent
                        .empty()
                        .appendText("선착순 떡돌리기 이벤트 참여 완료");
                }
                else {
                    firstcomeAirdropEvent.empty().append((0, skynode_1.el)("h5", "★☆ 선착순 떡돌리기 이벤트 진행중! ☆★"), (0, skynode_1.el)("a", "인절미 받기", {
                        click: async () => {
                            await FirstcomeAirdropContract_1.default.airdrop();
                        },
                    }));
                }
            }
        }
    };
    setInterval(() => refresh(), 2000);
    if ((await Wallet_1.default.connected()) !== true) {
        await Wallet_1.default.connect();
    }
})();
//# sourceMappingURL=main_%E3%85%90.js.map