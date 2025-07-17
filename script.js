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
  if (ref) {
    let invited = JSON.parse(localStorage.getItem("invitedList") || "{}");
    if (!invited[walletAddress]) {
      invited[walletAddress] = { uid: ref, amount: 10 + Math.floor(Math.random() * 6) }; // 模擬 10~15 USDC 購買
      localStorage.setItem("invitedList", JSON.stringify(invited));

      let lb = JSON.parse(localStorage.getItem("leaderboard") || "{}");
      if (!lb[ref]) lb[ref] = { count: 0, reward: 0 };
      if (lb[ref].count < 5) {
        lb[ref].count += 1;
        lb[ref].reward += Math.min(invited[walletAddress].amount, 15) * 0.2;
      }
      localStorage.setItem("leaderboard", JSON.stringify(lb));
    }
  }

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

  renderLeaderboard();
}

function renderLeaderboard() {
  const table = document.querySelector("#leaderboardTable tbody");
  table.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("leaderboard") || "{}");
  let sorted = Object.entries(data).sort((a,b) => b[1].reward - a[1].reward);
  sorted.slice(0, 10).forEach((entry, index) => {
    const [uid, stats] = entry;
    let row = `<tr><td>${index+1}</td><td>${uid}</td><td>${stats.count}</td><td>${stats.reward.toFixed(2)}</td></tr>`;
    table.innerHTML += row;
  });
}
