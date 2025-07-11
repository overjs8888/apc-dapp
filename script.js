const APC_CONTRACT_ADDRESS = '0x37ea6372a5ba8F6008749df8bf1EEc4d51Fb2D20';
const APC_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

let userAccount;

document.getElementById('connectWallet').onclick = async () => {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      document.getElementById('status').innerText = '✅ Connected!';
      document.getElementById('address').innerText = userAccount;
      getAPCBalance(userAccount);
    } catch (err) {
      document.getElementById('status').innerText = '❌ Connection failed';
      console.error(err);
    }
  } else {
    alert('Please install MetaMask!');
  }
};

document.getElementById('disconnectWallet').onclick = () => {
  userAccount = null;
  document.getElementById('status').innerText = '❌ Disconnected';
  document.getElementById('address').innerText = '';
  document.getElementById('apcBalance').innerText = '';
};

async function getAPCBalance(account) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(APC_CONTRACT_ADDRESS, APC_ABI, provider);
    const balance = await contract.balanceOf(account);
    const decimals = await contract.decimals();
    const formatted = ethers.utils.formatUnits(balance, decimals);
    document.getElementById('apcBalance').innerText = `💰 Your APC Balance: ${formatted}`;
  } catch (err) {
    console.error(err);
    document.getElementById('apcBalance').innerText = '⚠️ Error fetching balance';
  }
}
