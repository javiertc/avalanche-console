export const networks = [
  { value: "fuji-c", label: "Fuji (C-chain)" },
  { value: "fuji-x", label: "Fuji (X-chain)" },
  { value: "fuji-p", label: "Fuji (P-chain)" },
];

export const tokens = [
  { value: "avax", label: "AVAX", amount: "2" },
  { value: "usdc", label: "USDC", amount: "100" },
  { value: "eurc", label: "EURC", amount: "100" },
];

export const codeSnippets = {
  "Javascript SDK": {
    install: "npm install @avalanche-sdk/sdk",
    code: `import { AvalancheSDK } from "@ava-labs/avalanche-sdk";

const avax = new AvalancheSDK({
  serverURL: "https://api.avax.network",
  chainId: "43114",
});

async function run() {
  // Create a faucet request that returns a Faucet transaction, which can be used to retrieve the transaction hash.
  // Assuming 'wallet' and 'balance' are defined and initialized elsewhere in your code.
  // For example:
  // const wallet = avax.PChain().keyChain().importKey(process.env.PRIVATE_KEY);
  // const balance = await wallet.getBalance();
  let faucetTransaction;
  try {
    faucetTransaction = await wallet.faucet();
  
    // Wait for the faucet transaction to land on-chain.
    await faucetTransaction.wait();
  
    // Faucet transaction completed successfully
    // You could add proper logging here in production
  } catch (error) {
    // Handle error appropriately in production
  }
}

run();`,
  },
  "Python SDK": {
    install: "pip install avalanche-sdk",
    code: `from avalanche_sdk import AvalancheSDK

avax = AvalancheSDK(
    server_url="https://api.avax.network",
    chain_id="43114"
)

# Create faucet request
faucet_tx = wallet.faucet()

# Wait for transaction
faucet_tx.wait()

print(f"Faucet transaction: {faucet_tx}")`,
  },
  "Go SDK": {
    install: "go get github.com/ava-labs/avalanche-sdk-go",
    code: `package main

import (
    "fmt"
    "github.com/ava-labs/avalanche-sdk-go"
)

func main() {
    client := avalanche.NewClient("https://api.avax.network")
    
    // Request faucet funds
    tx, err := client.RequestFaucet(address)
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("Faucet transaction: %s\\n", tx.Hash())
}`,
  },
  Curl: {
    install: "",
    code: `curl -X POST https://api.avax-test.network/ext/bc/C/faucet \\
  -H "Content-Type: application/json" \\
  -d '{
    "address": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    "token": "AVAX"
  }'`,
  },
  Python: {
    install: "pip install requests",
    code: `import requests
import json

url = "https://api.avax-test.network/ext/bc/C/faucet"
payload = {
    "address": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    "token": "AVAX"
}

response = requests.post(url, json=payload)
print(response.json())`,
  },
  GO: {
    install: "go mod init faucet-example",
    code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "https://api.avax-test.network/ext/bc/C/faucet"
    
    payload := map[string]interface{}{
        "address": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        "token":   "AVAX",
    }
    
    jsonData, _ := json.Marshal(payload)
    resp, _ := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
    defer resp.Body.Close()
}`,
  },
} as const; 