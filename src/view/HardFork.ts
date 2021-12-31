import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import ArkContract from "../contracts/ArkContract";
import Wallet from "../klaytn/Wallet";
import ViewUtil from "./ViewUtil";

export default class HardFork implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        this.container = el(".hardfork-view",
            el("a", "< 뒤로가기", { click: () => ViewUtil.go("/") }),
            el("h1", "안녕하신가?\n 힘세고 강한 아침,\n 만일 내게 물어보면\n 나는 물레방아 하드포크"),
            el("p", "나는 한다. 강한 풀! 나는 한다. 딱풀!"),
            el("p.warning", "절대로 하드포크 도중에 인절미를 다른 지갑에 옮겨선 안됨!!! 모두 잃어버릴 수 있음!!!"),
            el("a", { href: "https://medium.com/tteok/%EB%AC%BC%EB%A0%88%EB%B0%A9%EC%95%84-%ED%95%98%EB%93%9C%ED%8F%AC%ED%81%AC-%EC%9D%B8%EC%A0%88%EB%AF%B8-2-0-7bcfcd7f2b9a", target: "_blank" },
                el("img", { src: "/images/hardInjeolmi.png" })),
            el("button", "나는 한다. 나의 인절미를 기록.", {
                click: async () => {
                    if (await Wallet.connected() !== true) {
                        await Wallet.connect();
                    }
                    const owner = await Wallet.loadAddress();
                    if (owner !== undefined) {
                        if ((await ArkContract.records(owner)).eq(0)) {
                            await ArkContract.record();
                            setTimeout(() => {
                                alert("기록 완료 ㅊㅋㅊㅋㅊ 4일부터 6일까지 이전 기간이니 반드시 또오셈!!~!@~!@~!@~!@");
                            }, 2000);
                        } else {
                            alert("이미 기록함");
                        }
                    }
                },
            })
        ).appendTo(BodyNode);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}
