import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Episode from '../pages/Episode';
import Location from '../pages/Location';
import { connect } from 'react-redux';
import Main from '../layouts/Main';

const App = (props) => {
	return (
		<BrowserRouter>
			<Main>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/episodes/:episodeId" component={Episode} />
					<Route exact path="/locations/:locationId" component={Location} />
					<Route component={NotFound} />
				</Switch>
			</Main>
		</BrowserRouter>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, null)(App);
