const connectButton = document.getElementById("connectButton");
const walletDisplay = document.getElementById("walletAddress");

const APC_CONTRACT = "0x37ea6372a5ba8F6008749df8bf1EEc4d51Fb2D20";
const APC_DECIMALS = 18;
const BASE_CHAIN_ID = "0x2105"; // Base mainnet

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected.");
    return;
  }

  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== BASE_CHAIN_ID) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BASE_CHAIN_ID }],
      });
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];
    walletDisplay.innerText = `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;

    const balance = await getAPCBalance(address);
    walletDisplay.innerText += `\nAPC Balance: ${balance}`;
  } catch (err) {
    walletDisplay.innerText = "Connection failed.";
    console.error(err);
  }
}

async function getAPCBalance(account) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    APC_CONTRACT,
    ["function balanceOf(address) view returns (uint256)"],
    provider
  );
  const rawBalance = await contract.balanceOf(account);
  return (rawBalance / 10 ** APC_DECIMALS).toLocaleString(undefined, {
    maximumFractionDigits: 4
  });
}

connectButton.addEventListener("click", connectWallet);
