import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './Wallet.module.css'


const Interactions1 = (props) => {

	const [transferHash, setTransferHash] = useState(null);

	const transferHandler = async (e) => {
		e.preventDefault();
	//	let betBoolean = true;
		let betAmount = e.target.betAmount.value;
		
		//console.log(signer)
		let txt = await props.contract.deposit({ value: ethers.utils.parseEther(betAmount)});

		setTransferHash(txt.hash);
	}
	
return (
	
			<div className={styles.interactionsCard}>
				<form onSubmit={transferHandler}>
						<h2> {"Step-2. Deposit bet money in Ether. "} </h2>
					<h3> {"Deposit Bet Money Eg (0.000000000000000001 Ether = 1 Wei)"}</h3>
						<p> Amount </p>
						<input type='number' id='betAmount' className={styles.numberInput}/>

					

						<button type='submit' className={styles.button6}>Send</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
}

export default Interactions1;