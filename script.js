
let walletAddress = null;

document.getElementById("connectBtn").addEventListener("click", async () => {
  if (typeof window.ethereum === 'undefined') {
    alert('Please use a supported browser and install MetaMask or another wallet extension.');
    return;
  }

  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      alert('No account selected. Please try connecting your wallet again.');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    walletAddress = await signer.getAddress();
    document.getElementById("connectBtn").textContent = walletAddress.slice(0,6) + '...' + walletAddress.slice(-4);

    checkEligibility();
  } catch (err) {
    alert('Wallet connection failed: ' + err.message);
  }
});

function checkEligibility() {
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref) {
    let invited = JSON.parse(localStorage.getItem("invitedList") || "{}");
    if (!invited[walletAddress]) {
      invited[walletAddress] = { uid: ref, amount: 10 + Math.floor(Math.random() * 6) };
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

  const myUid = walletAddress.slice(-6).toUpperCase();
  const link = window.location.origin + "/?ref=" + myUid;
  document.getElementById("inviteMsg").innerHTML = "You are eligible to invite! Your UID: <strong>" + myUid + "</strong>";
  const copyBtn = document.getElementById("copyUidBtn");
  copyBtn.style.display = "inline-block";
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(link);
    copyBtn.textContent = "Copied!";
  };

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
