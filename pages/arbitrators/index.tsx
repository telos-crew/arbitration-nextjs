import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'
import { Row, Col } from 'antd'
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout'
import { FETCH_ARBITRATORS } from '../../constants';
import { Election, Nominee, Config, Arbitrator } from '../../types';
import basicStyle from "@iso/assets/styles/constants"
import ArbitratorsTable from '../../components/arbitrators/ArbitratorsTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';

const { rowStyle, colStyle } = basicStyle

type Props = {
  elections: Election[],
  nominees: Nominee[],
  arbitrators: Arbitrator[],
  config: Config
}

function Elections({ arbitrators }: Props) {
  return (
    <>
      <Head>
        <title>Elections | Telos Arbitration</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <Row style={rowStyle} gutter={24}>
					<Col md={24} sm={24} xs={24} style={colStyle}>
              <ArbitratorsTable arbitrators={arbitrators} />
            </Col>
          </Row>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  )
}

export async function getServerSideProps() {
  const arbitratorsPromise = FETCH_ARBITRATORS()
  const [arbitrators] = await Promise.all([arbitratorsPromise])

	return {
		props: {
      arbitrators
		}
	}
}

export default Elections