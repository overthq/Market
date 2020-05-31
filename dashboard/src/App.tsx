import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Orders from './pages/Orders';
import Items from './pages/Items';
import Onboarding from './pages/Onboarding';
import Authenticate from './pages/Authenticate';
import VerifyAuthentication from './pages/VerifyAuthentication';

import Sidebar from './components/Sidebar';
import { Provider, createClient } from 'urql';
import useAccessToken from './hooks/useAccessToken';
import { useCurrentManagerQuery } from './types';

const AppContainer = styled.div`
	display: flex;
	align-items: stretch;
	height: 100vh;
`;

const MainContainer = styled.main`
	flex-grow: 1;
`;

const Routes: React.FC = () => {
	const [{ data, fetching }] = useCurrentManagerQuery();

	return fetching ? (
		<div>
			<p>Loading</p>
		</div>
	) : (
		<>
			<Route path='/onboarding' component={Onboarding} />
			<Route path='/store/:storeId/authenticate' component={Authenticate} />
			<Route
				path='/store/:storeId/verify-code'
				component={VerifyAuthentication}
			/>
			<Route
				path='/store/:storeId'
				render={({ match }) =>
					data?.currentManager ? (
						<Redirect to={`/store/${data.currentManager.store_id}/dashboard`} />
					) : (
						<Redirect to={`/store/${match.params.storeId}/authenticate`} />
					)
				}
			/>
			<Route
				path='/store/:storeId/dashboard'
				render={({ match }) => (
					<>
						<Sidebar />
						<MainContainer>
							<Switch>
								<Route exact path={match.url} component={Home} />
								<Route exact path={`${match.url}/orders`} component={Orders} />
								<Route
									exact
									path={`${match.url}/items`}
									render={() => <Items storeId={match.params.storeId} />}
								/>
							</Switch>
						</MainContainer>
					</>
				)}
			/>
			<Route
				exact
				strict
				path='/'
				component={() => (
					<Redirect
						to={
							data?.currentManager
								? `/store/${data.currentManager.store_id}`
								: '/onboarding'
						}
					/>
				)}
			/>
		</>
	);
};

const App = () => {
	const { loading, accessToken } = useAccessToken();

	const client = createClient({
		url: 'http://localhost:5000',
		fetchOptions: () => ({
			headers: {
				authorization: accessToken ? `Bearer ${accessToken}` : ''
			}
		})
	});

	return loading ? (
		<div>
			<p>Loading</p>
		</div>
	) : (
		<Provider value={client}>
			<BrowserRouter>
				<AppContainer>
					<Routes />
				</AppContainer>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
