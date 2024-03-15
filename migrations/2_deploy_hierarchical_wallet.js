const HierarchicalWallet = artifacts.require("HierarchicalWallet");

module.exports = function (deployer) {
  deployer.deploy(HierarchicalWallet, '0xe2aCfc4967c8eb0Cd32F6D02aCfb5D0bb064d5B6', '0xDE57E1034Dacd7f62502b5aa3cF1B87AC9fE13A6');
};