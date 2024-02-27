import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0xB23CE57701801A5448C1DFf4a15865B32F5557CF"
);

export default instance;
