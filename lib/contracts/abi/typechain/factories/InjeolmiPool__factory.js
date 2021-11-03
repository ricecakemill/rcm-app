"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjeolmiPool__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class InjeolmiPool__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_ijm, overrides) {
        return super.deploy(_ijm, overrides || {});
    }
    getDeployTransaction(_ijm, overrides) {
        return super.getDeployTransaction(_ijm, overrides || {});
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
exports.InjeolmiPool__factory = InjeolmiPool__factory;
const _abi = [
    {
        constant: true,
        inputs: [],
        name: "ijm",
        outputs: [
            {
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "swapToIJM",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "swapToKlay",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                name: "_ijm",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "user",
                type: "address",
            },
            {
                indexed: false,
                name: "amount",
                type: "uint256",
            },
        ],
        name: "SwapToIJM",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "user",
                type: "address",
            },
            {
                indexed: false,
                name: "amount",
                type: "uint256",
            },
        ],
        name: "SwapToKlay",
        type: "event",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506040516020806108c28339810180604052602081101561003057600080fd5b8101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610831806100916000396000f3fe6080604052600436106100345760003560e01c8063110d402514610039578063b4ccdfd014610090578063fe5a92b81461009a575b600080fd5b34801561004557600080fd5b5061004e6100d5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100986100fa565b005b3480156100a657600080fd5b506100d3600480360360208110156100bd57600080fd5b8101908080359060200190929190505050610353565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60003073ffffffffffffffffffffffffffffffffffffffff1631905060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b1580156101b657600080fd5b505afa1580156101ca573d6000803e3d6000fd5b505050506040513d60208110156101e057600080fd5b81019080805190602001909291905050509050600061021a8361020c348561064e90919063ffffffff16565b6106d490919063ffffffff16565b90506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156102c457600080fd5b505af11580156102d8573d6000803e3d6000fd5b505050506040513d60208110156102ee57600080fd5b8101908080519060200190929190505050503373ffffffffffffffffffffffffffffffffffffffff167faf533f6199ebcc804cb17814c019dd4e0877447183c6d6bc53bad825cdc0a2b6346040518082815260200191505060405180910390a2505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b1580156103f357600080fd5b505afa158015610407573d6000803e3d6000fd5b505050506040513d602081101561041d57600080fd5b8101908080519060200190929190505050905060003073ffffffffffffffffffffffffffffffffffffffff163190506000610499600a61048b600961047d8761046f8a8961064e90919063ffffffff16565b6106d490919063ffffffff16565b61064e90919063ffffffff16565b6106d490919063ffffffff16565b90506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330876040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561057757600080fd5b505af115801561058b573d6000803e3d6000fd5b505050506040513d60208110156105a157600080fd5b8101908080519060200190929190505050503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156105f9573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167ff4601942d4f74c92044aca098efd29dd8bb2c2dd8c57328ec919f138686a93ad856040518082815260200191505060405180910390a250505050565b60008083141561066157600090506106ce565b600082840290508284828161067257fe5b04146106c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806107e56021913960400191505060405180910390fd5b809150505b92915050565b600061071683836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061071e565b905092915050565b600080831182906107ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561078f578082015181840152602081019050610774565b50505050905090810190601f1680156107bc5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385816107d657fe5b04905080915050939250505056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a165627a7a72305820c6601aace520aec75a871d0d40dc77acce9e761df5dbebdab322a965c6459ce70029";
//# sourceMappingURL=InjeolmiPool__factory.js.map