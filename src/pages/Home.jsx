import React, { Component } from 'react';
import './styles/Home.css';
import CharacterItem from '../components/CharacterItem';
import {Pagination} from '@material-ui/lab';
import api from '../utils/api';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
const override = css`
	display: block;
	margin: 0 auto;
	border-color: blue;
`;
//import logo from '../assets/images/start_wars_logo.svg';

class Home extends Component {
	state = {
		count: 0,
		loading: false,
		error: false,
		characters: [],
		page: 1,
	};
	fetchData = async () => {
		this.setState({ loading: true, error: null });
		try {
			let data = await api.getCharacters(this.state.page);
			console.log(data);
			this.setState({
				loading: false,
				error: null,
				characters: data.characters.results,
			});
		} catch (error) {
			this.setState({ loading: false, error: error });
		}
	};

	componentDidMount() {
		this.fetchData();
	}

	handleChange() {
		console.log(this.state.page);
	}

	render() {
		return (
			<main className="container-full">
				<section className="title-page-container">
					<h1 className="title-page">Rick And Morty Characters</h1>
					{/* <div className="hero-image" width="378">
						<img src={logo} alt="start wars logo" />
					</div> */}
				</section>
				<div className="sweet-loading">
					<ClipLoader
						css={override}
						size={150}
						color={'#123abc'}
						loading={this.state.loading}
					/>
				</div>
				{!this.state.loading && (
					<>
						<section className="container-all-characters">
							<div className="container-characters">
								{this.state.characters.map((item) => (
									<CharacterItem key={item.id} character={item}></CharacterItem>
								))}
							</div>
						</section>
						<section className="py-2 d-flex justify-content-center">
							<Pagination
								count={10}
								page={this.state.page}
								onChange={this.handleChange}
							/>
						</section>
					</>
				)}
			</main>
		);
	}
}

export default Home;
