"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportsInterfaceWithLookupMock__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class SupportsInterfaceWithLookupMock__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.SupportsInterfaceWithLookupMock__factory = SupportsInterfaceWithLookupMock__factory;
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "INTERFACE_ID_KIP13",
        outputs: [
            {
                name: "",
                type: "bytes4",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506100276301ffc9a760e01b61002c60201b60201c565b610117565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614156100ab576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806102c0602e913960400191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b61019a806101266000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806301ffc9a71461003b578063d81037cd146100a0575b600080fd5b6100866004803603602081101561005157600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690602001909291905050506100fc565b604051808215151515815260200191505060405180910390f35b6100a8610163565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b6301ffc9a760e01b8156fea165627a7a72305820279a12d31e96e7f3a00818f5ae22587c00c9d80b93a9997586bb0ef846862be300294b49503133496e7465726661636573537570706f727465643a20696e76616c696420696e74657266616365206964";
//# sourceMappingURL=SupportsInterfaceWithLookupMock__factory.js.map