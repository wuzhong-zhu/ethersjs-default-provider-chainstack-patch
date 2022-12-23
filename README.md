# ethersjs-default-provider-chainstack-patch

[Ethers.JS](https://docs.ethers.org/v5/) is a popular javascript library for web3 development. Currently it has 5 infrastructure partners as default API providers:
- Etherscan
- INFURA
- Alchemy
- Pocket Gateway
- Ankr

This Patch helps Chainstack users to easily change their existing application from one of the default providers to Chainstack.
Currently this patch supports:
- from INFURA to Chainstack
- from Alchemy to Chainstack
- from Ankr to Chainstack

## Installation
1. Clone this repository to a local folder, open a terminal there
2. Run `npm install` to install all dependencies
3. Run `node run patch` to copy the patch files into desired folders
4. Open test.js in a text editor and fill in your Chianstack endpoint at line 2: `const  cs_url = "https://nd-123-456.p2pify.com/ABCDabcd"`
5. Run `node test` to see the result

## How does it work
In the original ethers.js, some parameters are required to use a default provider.
For Alchemy and Ankr, its their API key:
`ethers.providers.AlchemyProvider("homestead", apiKey);`
`ethers.providers.AnkrProvider("homestead", apiKey);`
For INFURA, its the project ID and project secret:

	ethers.providers.InfuraProvider.getWebSocketProvider("homestead", 
	   {projectId:  projectId,
        projectSecret:  projectSecret}
	)
In order to use Chainstack, you need to map some of the parameters to a Chainstack endpoint URL.
- Alchemy and Ankr: apiKey
- INFURA: projectId

A typical Chainstack URL is in the format of:
`https://nd-123-456-789.p2pify.com/ABCDabcd`
An example for Alchemy provider:
		
	var  apiKey = cs_url
	var  provider = new  ethers.providers.AlchemyProvider("homestead", apiKey);
	var  wsProvider = new  ethers.providers.AlchemyProvider.getWebSocketProvider("homestead", apiKey)
	var  bn = await  provider.getBlockNumber()
	var  bn2 = await  wsProvider.getBlockNumber()
	console.log("http result:" + bn)
	console.log("ws result:" + bn2)

## Migration
<b>Warning: Make a copy of your working folder before applying this patch</b>

This patch basically overwrites the provider module of Ethersjs, applying a patch is basically moving the three Javascript files from `Chainstack_patch` folder to `./node_modules/@ethersproject/providers/lib`.
### Something to take note
- The blockchain is deeply binded with the Chainstack endpoint so the network type parameter doesn't really do anything. It can be set to any string or a null value.
- So as the `projectSecret` parameters for INFURA provider, it is suppose to be set to null.
- Websocket provider is supported too, it is generated from the https URL.

This patch can be customized for special requirement. If it is needed, please send a Email to Chainstack's support team: support@chainstack.com.
