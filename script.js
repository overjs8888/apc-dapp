
document.getElementById('connectWallet').onclick = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById('status').innerText = 'Connected: ' + accounts[0];
    } catch (error) {
      console.error(error);
      document.getElementById('status').innerText = 'Connection failed';
    }
  } else {
    alert('Please install MetaMask!');
  }
};
document.getElementById("disconnectWallet").addEventListener("click", () => {
  // 模擬取消連線（不能真正移除錢包授權，只能讓畫面變成「未連線」）
  document.getElementById("status").innerText = "Wallet disconnected";
});
