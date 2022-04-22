import React from 'react';
import { useRouter } from 'next/router'
import Head from "next/head"
import { Card, Col, Row } from "antd";
import PageHeader from "@iso/components/utility/pageHeader";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import IntlMessages from "@iso/components/utility/intlMessages";
import basicStyle from "@iso/assets/styles/constants"
import styles from "@iso/style/Daos.module.scss";

const { rowStyle, colStyle, gutter } = basicStyle;

type Props = {};

const DAO = (props: Props) => {
	const { query: { id } } = useRouter()
	console.log('DAO id: ', id);
	return (
		<div>
			<Head>
				<title>Daoable | DAO</title>
			</Head>
			<DashboardLayout>
        <LayoutWrapper>
          <Row style={rowStyle} gutter={gutter} justify="start">
						<Col md={24}>
							<Card>
								<Col md={3}>
									<img
											src="https://via.placeholder.com/150"
											alt="Project Logo"
											className={styles.daoLogo}
									/>
								</Col>
								<Col md={21}>
									<h1>Project Name</h1>
									<div>
										<span>@somethingdao</span>
									</div>
								</Col>
							</Card>
						</Col>
          </Row>
        </LayoutWrapper>
			</DashboardLayout>
		</div>		
	);
};

export default DAO;
