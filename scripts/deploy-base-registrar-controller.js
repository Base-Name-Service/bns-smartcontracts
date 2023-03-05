const hre = require("hardhat");
const namehash = require("eth-ens-namehash");
const tld = "base";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label));
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const ENS_ADDRESS = "0x4FA66bfbC8Eb153EEfdd1a223D21fb84424f1dd0";

async function main() {
  // interact with the deployed contract
  const ENSRegistry = await ethers.getContractFactory("ENSRegistry");
  const ens = await ENSRegistry.attach(ENS_ADDRESS);

  const BaseRegistrar = await ethers.getContractFactory(
    "BaseRegistrarImplementation"
  );
  const signers = await ethers.getSigners();
  const accounts = signers.map((s) => s.address);
  const registrar = await BaseRegistrar.deploy(ens.address, namehash.hash(tld));
  await registrar.deployed();
  await setupRegistrar(ens, registrar);
  console.log("registrar deployed to:", registrar.address);
}

async function setupRegistrar(ens, registrar) {
  await ens.setSubnodeOwner(ZERO_HASH, labelhash(tld), registrar.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
