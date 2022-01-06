import { BodyNode, DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import InjeolmiContract from "../contracts/InjeolmiContract";
import InjeolmiPoolContract from "../contracts/InjeolmiPoolContract";
import InjeolmiPriceContract from "../contracts/InjeolmiPriceContract";
import Wallet from "../klaytn/Wallet";
import ViewUtil from "./ViewUtil";

export default class Classic implements View {

    private container: DomNode;
    private interval: any;

    private priceDisplay: DomNode;
    private ijmPrice: BigNumber = BigNumber.from(0);

    private buyInput: DomNode<HTMLInputElement>;
    private buyResult: DomNode;

    private sellInput: DomNode<HTMLInputElement>;
    private sellResult: DomNode;

    constructor() {
        this.container = el(".home-view",
            el("h1", "인절미 클래식"),
            el("img.logo", { src: "/images/injeolmi-classic.png", height: "330" }),
            el("p", msg("INJEOLMI_DESC")),
            el("h3", "인절미 클래식 떡크노믹스"),
            el("p", msg("INJEOLMI_TOKENOMICS_DESC_1")),
            el("p", "인절미 클래식은 클레이튼 밈 토큰입니다. 따라서 클레이튼 지갑인 카이카스 지갑이 필요합니다."),
            el("a", msg("DOWNLOAD_KAIKAS_BUTTON"), {
                href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi",
                target: "_blank",
            }),
            el(".links",
                el("a", msg("ADD_INJEOLMI_TO_WALLET_BUTTON"), {
                    click: () => Wallet.addToken(
                        InjeolmiContract.address,
                        "IJM",
                        8,
                        "https://raw.githubusercontent.com/tteokmill/tteok-app/main/docs/images/injeolmi.png"
                    ),
                }), "\n",
                el("a", msg("INJEOLMI_CONTRACT_BUTTON"), {
                    href: "https://scope.klaytn.com/token/0x9CFc059F64D664F92f3d0329844B8ccca4E5215B",
                    target: "_blank",
                }), "\n",
                el("a", msg("INJEOLMI_SOURCE_CODE_BUTTON"), {
                    href: "https://github.com/tteokmill/injeolmi",
                    target: "_blank",
                }), "\n",
                el("a", msg("INJEOLMI_CHART_BUTTON"), {
                    href: "https://dexata.kr/?tokenA=0x9cfc059f64d664f92f3d0329844b8ccca4e5215b&tokenB=0x0000000000000000000000000000000000000000",
                    target: "_blank",
                }),
            ),
            el("p.warning", "절대 본인의 인절미 클래식을 본인의 지갑에 전송하지 마세요. 인절미 클래식을 모두 잃어버릴 수 있습니다!"),
            el(".card",
                el("h5", "인절미 클래식 가격"),
                el("h6", (this.priceDisplay = el("span.price", "...")), " KLAY\n"),
            ),
            el("h3", "클레이로 인절미 클래식 사기"),
            el("p", "인절미 클래식을 살때도 떡크노믹스 때문에 10%를 적게 받습니다."),
            el(".form",
                this.buyInput = el("input", {
                    placeholder: msg("KLAY_AMOUNT"),
                    keyup: () => setTimeout(() => {
                        const value = utils.parseEther(this.buyInput.domElement.value);
                        this.buyResult.empty().appendText(
                            `대략 ${utils.formatEther(
                                value.mul(utils.parseEther("1")).div(this.ijmPrice).mul(9).div(10)
                            )} IJM`
                        );
                    }),
                }),
                this.buyResult = el(".result"),
                el("button", msg("BUY_INJEOLMI_BUTTON"), {
                    click: async () => {
                        await InjeolmiPoolContract.swapToIJM(
                            utils.parseEther(this.buyInput.domElement.value)
                        );
                    },
                })
            ),
            el("h3", "인절미 클래식 클레이로 팔기"),
            el("p", "인절미 클래식을 펄때도 떡크노믹스 때문에 10%를 적게 받습니다."),
            el(".form",
                this.sellInput = el("input", {
                    placeholder: msg("IMJ_AMOUNT"),
                    keyup: () => setTimeout(() => {
                        const value = utils.parseEther(this.sellInput.domElement.value);
                        this.sellResult.empty().appendText(
                            `대략 ${utils.formatEther(
                                value.mul(this.ijmPrice).div(utils.parseEther("1")).mul(9).div(10)
                            )} KLAY`
                        );
                    }),
                }),
                this.sellResult = el(".result"),
                el("button", msg("SELL_INJEOLMI_BUTTON"), {
                    click: async () => {
                        await InjeolmiPoolContract.swapToKlay(
                            utils.parseUnits(this.sellInput.domElement.value, 8)
                        );
                    },
                })
            ),
            el("footer",
                el("a", msg("TWITTER_BUTTON"), {
                    href: "https://twitter.com/tteokclassic",
                    target: "_blank",
                }), "\n",
                el("a", msg("KAKAOTALK_BUTTON"), {
                    href: "https://open.kakao.com/o/gc5NMySd",
                    target: "_blank",
                }), "\n",
                el("img", { src: "/images/thankyou.gif", height: "107.5" })
            ),
        ).appendTo(BodyNode);

        this.refresh();
        this.interval = setInterval(() => this.refresh(), 2000);

        this.ddd();
    }

    private async ddd() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
    }

    private async refresh() {
        this.ijmPrice = await InjeolmiPriceContract.price();
        if (this.container.deleted !== true) {
            this.priceDisplay.empty().appendText(utils.formatEther(this.ijmPrice));
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}
