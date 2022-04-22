import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "@iso/library/Web3Provider";
import { DAOFactoryABI } from "@iso/library/ContractABIs";
import { ethers } from "ethers";
import { Col, Row } from "antd";
import DAOCard from "@iso/components/DAOCard";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import "@iso/style/Daos.module.scss";
import PageHeader from "@iso/components/utility/pageHeader";
import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
import IntlMessages from "@iso/components/utility/intlMessages";
import basicStyle from "@iso/assets/styles/constants";
import Card from "./Card.styles";

console.log(`Factory: ${process.env.NEXT_PUBLIC_DAOFACTORY_ADDRESS}`);

function DAOs(props) {
	//get context
	const { eth } = useContext(Web3Context);
	const [ethersProvider, setEthersProvider] = eth;
	const [addresses, setAddresses] = useState([]);

	async function fetchDAOAddresses() {
		const daoFactoryContract = new ethers.Contract(
			process.env.NEXT_PUBLIC_DAOFACTORY_ADDRESS,
			DAOFactoryABI,
			ethersProvider
		);

		let addresses = [];
		for (let i = 0; i < 20; i++) {
			const addr = await daoFactoryContract.daos(i);
			//ids that map to zero address are ignored
			if (addr == ethers.constants.AddressZero) {
				break;
			} else {
				addresses.push(addr);
			}
		}
		setAddresses(addresses);
	}

	useEffect(() => {
		if (ethersProvider != undefined) {
			fetchDAOAddresses();
		}
	}, [ethersProvider]);

	const { rowStyle, colStyle, gutter } = basicStyle;

  console.log('addresses', addresses);

	return (
		<div>
			<Head>
				<title>Daoable | DAOs</title>
			</Head>
			<DashboardLayout>
        <LayoutWrapper>
          <PageHeader>{<IntlMessages id="sidebar.daos" />}</PageHeader>
          <Row style={rowStyle} gutter={gutter} justify="start">
            {[{},{},{},{},{},{},{},{},{}].map((value, index) => (
              <DAOCard key={value.toString()} id={index} address={value} />
            ))}
          </Row>

        </LayoutWrapper>
			</DashboardLayout>
		</div>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {
			pageSize: context.query.pageSize || 10, //defaults to 10 if no page size given
			pageNum: context.query.pageNum || 1, //defaults to 1 if no page number given
		}, // will be passed to the page component as props
	};
}

export default DAOs;
