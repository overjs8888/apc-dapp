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
