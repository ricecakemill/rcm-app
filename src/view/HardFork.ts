import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import ViewUtil from "./ViewUtil";

export default class HardFork implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        this.container = el(".hardfork-view",
            el("a", "< 뒤로가기", { click: () => ViewUtil.go("/") }),
            el("h1", "안녕하신가?\n 힘세고 강한 아침,\n 만일 내게 물어보면\n 나는 물레방아 하드포크"),
            el("p", "나는 한다. 강한 풀! 나는 한다. 걸다! 나는 한다. 후원!"),
            el("a", { href: "https://medium.com/tteok/%EB%AC%BC%EB%A0%88%EB%B0%A9%EC%95%84-%ED%95%98%EB%93%9C%ED%8F%AC%ED%81%AC-%EC%9D%B8%EC%A0%88%EB%AF%B8-2-0-7bcfcd7f2b9a", target: "_blank" },
                el("img", { src: "/images/hardInjeolmi.png" })),
            el("button", "나는 한다. 나의 인절미를 기록.")
        ).appendTo(BodyNode);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}
