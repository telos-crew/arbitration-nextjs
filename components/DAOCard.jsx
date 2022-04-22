import Link from "next/Link";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../library/Web3Provider";
import { DAOFactoryABI, DAOABI } from "../library/ContractABIs";
import { ethers } from "ethers";
import { Col, Card, Typography } from "antd";
import Box from "@iso/components/utility/box";
import styles from "../style/Daos.module.scss";
import basicStyle from "@iso/assets/styles/constants";
import IntlMessages from "@iso/components/utility/intlMessages";
const { Paragraph, Title } = Typography;

const PLACEHOLDER_TEXT =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially uncha";

function DAOCard(props) {
	//get props
	const id = props.id;
	const addr = props.address;

	//get context
	const { eth } = useContext(Web3Context);
	const [ethersProvider, setEthersProvider] = eth;

	//set state
	const [daoAddress, setDAOAddress] = useState(addr);
	const [daoName, setDAOName] = useState("");
	const [proposalCount, setProposalCount] = useState(-1);

	async function fetchDAOName() {
		//create dao abstraction with signer
		const daoContract = new ethers.Contract(daoAddress, DAOABI, ethersProvider);
		//query dao name
		const name = await daoContract.daoName();
		//save dao name to state
		setDAOName(name);
	}

	useEffect(() => {
		if (daoName == "" && ethersProvider != undefined) {
			fetchDAOName();
		}
	}, [daoAddress]);

	async function fetchDAOProposalCount() {
		//create dao abstraction with signer
		const daoContract = new ethers.Contract(daoAddress, DAOABI, ethersProvider);
		//query proposal count
		const propCount = await daoContract.activeProposalCount();
		//save proposal count to state
		setProposalCount(propCount.toNumber());
	}

	useEffect(() => {
		//needed since some vars will not be ready until component renders
		if (proposalCount == -1 && ethersProvider != undefined) {
			fetchDAOProposalCount();
		}
	}, [daoAddress]);

	const { rowStyle, colStyle, gutter } = basicStyle;

	return (
		<Col md={12} sm={12} xs={24} style={colStyle}>
            <Link href={"/daos/" + daoAddress}>
                <Card variant="outlined" className={styles.daoCard}>
                    <div className={styles.daoCardContents}>
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Project Logo"
                            className={styles.daoLogo}
                        />
                        <div className={styles.daoInfoArea}>
                            <Title level={3}>{daoName}</Title>
                            <Paragraph>@daoName</Paragraph>
                            <Paragraph className={styles.daoDescription}>
                                {PLACEHOLDER_TEXT}
                            </Paragraph>
                            <Paragraph className={styles.daoIcons}>
                                💎 {proposalCount} | 🗳 {proposalCount}
                            </Paragraph>
                        </div>
                    </div>
                </Card>
            </Link>
		</Col>
	);
}

export default DAOCard;
