export const DAOFactoryABI = [
    "function daoCount() public view returns (uint256)",
    "function daos(uint256) public view returns (address)",
    "function createDAO(string daoName, address nftContract) public payable",
    "function isDAO(address dao) public view returns (bool)",
    "event DAOCreated(address dao, address nftcontract, address creator)"
]

export const DAOABI = [
    "function factoryAddress() public view returns (address)",
    "function nftAddress() public view returns (address)",
    "function treasuryAddress() public view returns (address)",
    "function daoName() public view returns (string)",
    "function daoMeta() public view returns (string)",
    "function proposals(uint256) public view returns (address)",
    "function setDAOName(string) public",
    "function setDAOMeta(string) public",
    "function activeProposalCount() public view returns (uint256)"
]

export const ProposalABI = [
    "function proposalTitle() public view returns (string)",
    "function voteCount() public view returns (uint256)",
    "function startTime() public view returns (uint256)",
    "function endTime() public view returns (uint256)",
    "function choices(uint256) public view returns (string)",
    "function voteTotals(uint256) public view returns (uint256)"
]

export const TreasuryABI = [
    "function depositNative() pulic payable",
    "event NativeReceived(address from, uint256 amount)"
]

export const ERC721ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function maxSupply() view returns (uint256)",
    "function ownerOf(uint256) view returns (address)"
]