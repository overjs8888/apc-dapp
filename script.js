document.getElementById('connectBtn').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
      document.getElementById('connectBtn').innerText = shortAddress;
    } catch (error) {
      alert('Connection request was rejected.');
    }
  } else {
    alert('MetaMask is not installed. Please install it to connect your wallet.');
  }
});
// ⏳ Countdown Timer
const countdownTarget = new Date("2025-07-20T00:00:00Z"); // 快照時間（可改）
const countdownEl = document.getElementById('countdown');

function updateCountdown() {
  const now = new Date();
  const diff = countdownTarget - now;
  if (diff <= 0) {
    countdownEl.innerText = "Snapshot taken!";
    return;
  }
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdownEl.innerText = `${hours}h ${minutes}m ${seconds}s remaining`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 🛡️ Simulated Mint
function mintBadge() {
  const btn = document.querySelector('.mint-section button');
  const status = document.getElementById('mint-status');
  btn.disabled = true;
  btn.innerText = "Minting...";
  setTimeout(() => {
    status.innerText = "✅ Mint Successful! Your badge is on-chain.";
    btn.innerText = "Minted";
  }, 2000);
}
// 👁️ Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
});
fadeEls.forEach(el => observer.observe(el));

// ⏳ Countdown Timer
const countdownTarget = new Date("2025-07-20T00:00:00Z");
const countdownEl = document.getElementById('countdown');

function updateCountdown() {
  const now = new Date();
  const diff = countdownTarget - now;
  if (diff <= 0) {
    countdownEl.innerText = "Snapshot taken!";
    return;
  }
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdownEl.innerText = `${hours}h ${minutes}m ${seconds}s remaining`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 🛡️ Simulated Mint
function mintBadge() {
  const btn = document.querySelector('.mint-section button');
  const status = document.getElementById('mint-status');
  btn.disabled = true;
  btn.innerText = "Minting...";
  setTimeout(() => {
    status.innerText = "✅ Mint Successful! Your badge is on-chain.";
    btn.innerText = "Minted";
  }, 2000);
}
