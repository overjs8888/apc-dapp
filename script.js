const connectWalletButton = document.getElementById('connectWallet');
const disconnectWalletButton = document.getElementById('disconnectWallet');
const statusDiv = document.getElementById('status');
const apcBalanceDiv = document.getElementById('apcBalance');

// APC contract address and ABI
const apcAddress = "0x37ea6372a5ba8F6008749df8bf1EEc4d51Fb2D20";
const apcABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

let provider;
let signer;

// Connect wallet
connectWalletButton.onclick = async () => {
  if (typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    statusDiv.innerText = `Connected: ${userAddress}`;

    const apcContract = new ethers.Contract(apcAddress, apcABI, provider);
    const rawBalance = await apcContract.balanceOf(userAddress);
    const decimals = await apcContract.decimals();
    const formatted = ethers.utils.formatUnits(rawBalance, decimals);

    apcBalanceDiv.innerText = `Your APC Balance: ${formatted}`;
  } else {
    statusDiv.innerText = "MetaMask not detected.";
  }
};

// Disconnect wallet (simulated)
disconnectWalletButton.onclick = () => {
  statusDiv.innerText = "";
  apcBalanceDiv.innerText = "";
};
