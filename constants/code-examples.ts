export const DATA_API_CODE_EXAMPLES = {
  javascript: {
    install: 'npm install @ava-labs/avalanche-sdk',
    code: `import { AvalancheSDK } from "@ava-labs/avalanche-sdk";

const avax = new AvalancheSDK({
  serverURL: "https://api.avax.network",
  chainId: "43114",
});

async function run() {
  const balance = await avax.evm.address.balances.getNative({
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    blockTag: "latest",
    currency: "usd",
  });

  console.log(balance);
}

run();`
  },
  python: {
    install: 'pip install avalanche-sdk',
    code: `from avalanche_sdk import AvalancheSDK

avax = AvalancheSDK(
    server_url="https://api.avax.network",
    chain_id="43114"
)

def get_balance():
    balance = avax.evm.address.balances.get_native(
        address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        block_tag="latest",
        currency="usd"
    )
    print(balance)

if __name__ == "__main__":
    get_balance()`
  },
  go: {
    install: 'go get github.com/ava-labs/avalanchego/sdk',
    code: `package main

import (
    "fmt"
    "log"
    
    "github.com/ava-labs/avalanchego/sdk"
)

func main() {
    client := sdk.NewClient(
        "https://api.avax.network",
        "43114",
    )
    
    balance, err := client.EVM.Address.Balances.GetNative(sdk.BalanceRequest{
        Address:  "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        BlockTag: "latest",
        Currency: "usd",
    })
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Balance: %+v\\n", balance)
}`
  }
}; 