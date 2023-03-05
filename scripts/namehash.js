const namehash = require("eth-ens-namehash");
const hre = require("hardhat");
const ethers = hre.ethers;
const utils = ethers.utils;

const tld = "coin";

console.log(namehash.hash("hanna.base"));

const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label));

console.log(labelhash("jackjack"));
