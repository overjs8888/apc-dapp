let walletAddress = null;
let hasPurchased = false;

document.getElementById("connectBtn").addEventListener("click", async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      walletAddress = await signer.getAddress();
      document.getElementById("connectBtn").textContent = walletAddress.slice(0,6) + '...' + walletAddress.slice(-4);
      checkEligibility();
    } catch (err) {
      alert('Wallet connection failed');
    }
  } else {
    alert('Please install MetaMask');
  }
});

function checkEligibility() {
  const ref = new URLSearchParams(window.location.search).get("ref");
  // 模擬條件（未來可改成查詢真實交易）
  hasPurchased = Math.random() > 0.3;
  const inviteMsg = document.getElementById("inviteMsg");
  const copyBtn = document.getElementById("copyUidBtn");

  if (hasPurchased) {
    const myUid = walletAddress.slice(-6).toUpperCase();
    const link = window.location.origin + "/?ref=" + myUid;
    inviteMsg.innerHTML = "You are eligible to invite! Your UID: <strong>" + myUid + "</strong>";
    copyBtn.style.display = "inline-block";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(link);
      copyBtn.textContent = "Copied!";
    };
  } else {
    inviteMsg.textContent = "You must buy ≥ 10 USDC worth of APC to unlock your UID.";
    copyBtn.style.display = "none";
  }
}
