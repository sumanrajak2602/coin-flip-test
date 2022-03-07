import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './Wallet.module.css'
import simple_token_abi from './Contracts/simple_token_abi.json'
import Interactions from './Interactions';
import Interactions1 from './Interactions1';

const Wallet = () => {

	// ganache-cli address
	const contractAddress = '0xad86835f962a1F28aB3bafa771aaf5C86eC6D40d';

	const [tokenName, setTokenName] = useState("Coin Flip Game");
	const [connButtonText, setConnButtonText] = useState("Connect Wallet");
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [balance, setBalance] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);


	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			})


		} else {
			console.log('need to install metamask');
			setErrorMessage('Please install MetaMask');
		}
	}

	const accountChangedHandler = (newAddress) => {
		setDefaultAccount(newAddress);
		updateEthers();
	}

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

		let tempSigner = tempProvider.getSigner();

		let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner)

		setProvider(tempProvider);
		setSigner(tempSigner);
		setContract(tempContract);
	}

	useEffect(() => {
		if (contract != null) {
			updateBalance();
		//	updateTokenName();
		}
	}, [contract])

	const updateBalance = async () => {
		let balanceBigN = await contract.getuserBalance();
		let balanceNumber = balanceBigN.toNumber();

	//	let decimals = await contract.decimals();

	//	let tokenBalance = balanceNumber / Math.pow(10, decimals);

		setBalance(balanceNumber);
		console.log(balanceNumber);
	}

	const updateTokenName = async () => {

		
		let betBoolean = true;
		console.log(betBoolean)
		let txt = await contract.flip(betBoolean);
		console.log(txt);
	}
	
return (
	<div>
		<h2> {tokenName} </h2>
			<h2> {"Refresh the page after performing any action."} </h2>
		<h2> {"Step-1. Connect your metamask by clicking below"} </h2>
		<button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>

		<div className = {styles.walletCard}>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div>
				<h3>{tokenName} User Balance: {balance}</h3>
			</div>
			{errorMessage}
			</div>

		<Interactions1 contract={contract}/>
			<Interactions contract={contract}/>

		
	</div>
	);
}

export default Wallet;