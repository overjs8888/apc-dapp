
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
