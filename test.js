const { ethers } = require("ethers");
const cs_url = ""
run()

// Alchemy
async function testAlchemy() {
    console.log("Compatibility testing for Alchemy")
    var apiKey = cs_url
    var provider = new ethers.providers.AlchemyProvider("homestead", apiKey);
    var wsProvider = new ethers.providers.AlchemyProvider.getWebSocketProvider("homestead", apiKey)
    var bn = await provider.getBlockNumber()
    var bn2 = await wsProvider.getBlockNumber()
    console.log("http result:" + bn)
    console.log("ws result:" + bn2)
    wsProvider._websocket.terminate()
}

// Infura
async function testInfura() {
    console.log("Compatibility testing for  Infura")
    var projectId = cs_url
    var projectSecret = null

    console.log("Infura test 1:ProjectID + secret")
    var provider = new ethers.providers.InfuraProvider("homestead", {
        projectId: projectId,
        projectSecret: projectSecret
    });
    var wsProvider = new ethers.providers.InfuraProvider.getWebSocketProvider("homestead", {
        projectId: projectId,
        projectSecret: projectSecret
    })
    var bn = await provider.getBlockNumber()
    var bn2 = await wsProvider.getBlockNumber()
    console.log("http result:" + bn)
    console.log("ws result:" + bn2)
    wsProvider._websocket.terminate()

    console.log("Infura test 2: network + ProjectID")
    provider = new ethers.providers.InfuraProvider("homestead", projectId);
    wsProvider = new ethers.providers.InfuraProvider.getWebSocketProvider("homestead", projectId);
    var bn = await provider.getBlockNumber()
    var bn2 = await wsProvider.getBlockNumber()
    console.log("http result:" + bn)
    console.log("ws result:" + bn2)
    wsProvider._websocket.terminate()

    console.log("Infura test 3: null + ProjectID")
    provider = new ethers.providers.InfuraProvider(null, projectId);
    wsProvider = new ethers.providers.InfuraProvider.getWebSocketProvider(null, projectId);
    var bn = await provider.getBlockNumber()
    var bn2 = await wsProvider.getBlockNumber()
    console.log("http result:" + bn)
    console.log("ws result:" + bn2)
    wsProvider._websocket.terminate()
}

// Infura
async function testAnkr() {
    console.log("Compatibility testing for Ankr")
    var apiKey = cs_url
    var provider = new ethers.providers.AnkrProvider("homestead", apiKey);
    var bn = await provider.getBlockNumber()
    console.log("http result:" + bn)
}

async function run() {
    await testAlchemy()
    await testInfura()
    await testAnkr()
}