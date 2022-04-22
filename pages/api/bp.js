export default function handler(req, res) {
  res.status(200).json(
    {
      "producer_account_name": "dappetizerbp",
      "org": {
        "candidate_name": "Dappetizer",
        "website": "https://dappetizer.io",
        "ownership_disclosure": "Dappetizer is 100% owned and operated by Stephen Branscom",
        "social": {
          "twitter": "@dappetizerio"
        }
      },
      "nodes": [
        {
          "location": {
            "name": "Chicago",
            "country": "US"
          },
          "node_type": "producer"
        }
      ]
    }
  )
}
