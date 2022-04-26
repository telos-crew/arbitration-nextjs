import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'

import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout'
import { useSelector } from 'react-redux';
import { RootState } from '../../types'
import ElectionsTable from '../../components/elections/ElectionsTable';
import { FETCH_ELECTIONS } from '../../constants/elections';

type Props = {
  elections: any[]
}

function Elections({ elections }: Props) {
  const { identity } = useSelector((state: RootState) => state.auth)

  return (
    <>
      <Head>
        <title>Elections | Telos Arbitration</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <ElectionsTable elections={elections} />
        </LayoutWrapper>
      </DashboardLayout>
    </>
  )
}

export async function getServerSideProps() {
  let elections
  try {
    elections = await FETCH_ELECTIONS()
  } catch (err) {
    console.warn(err)
  }
	return {
		props: {
			elections
		}
	}
}

export default Elections