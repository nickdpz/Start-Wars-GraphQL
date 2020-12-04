import React, { Component } from 'react';
import api from '../utils/api';
import { css } from '@emotion/core';
import MoonLoader from 'react-spinners/MoonLoader';
import moment from 'moment';
import '../assets/styles/Home.css';
import '../assets/styles/Episodes.css';
import { Link } from 'react-router-dom';
const override = css`
	display: block;
	margin: 0 auto;
	border-color: blue;
`;

class Location extends Component {
	state = {
		loading: true,
		error: false,
		location: {},
	};
	fetchData = async (id) => {
		this.setState({ loading: true, error: null });
		try {
			let data = await api.getLocation(this.props.match.params.locationId);
			console.log(data.locationsByIds[0]);
			this.setState({
				loading: false,
				error: null,
				location: data.locationsByIds[0],
			});
		} catch (error) {
			this.setState({ loading: false, error: error });
		}
	};
	componentDidMount() {
		this.fetchData();
	}
	render() {
		return (
			<main className="container-full">
				<section className="title-page-container title-color">
					<h1 className="title-page text-white">Rick And Morty Locations</h1>
				</section>
				<div className="sweet-loading mt-4">
					<MoonLoader
						css={override}
						size={150}
						color={'#123abc'}
						loading={this.state.loading}
					/>
				</div>
				{!this.state.loading && (
					<div className="container">
						<div className="row d-flex justify-content-center align-items-center justify-content-lg-between">
							<h1 className="title-location">{`${this.state.location.name}  -  ${this.state.location.dimension}`}</h1>
							<h2>
								{`Created ${moment(this.state.location.created).format(
									'MMM DD, YYYY'
								)}`}
							</h2>
						</div>
						<div className="row mt-2">
							<Link to="/">
								<h2>Residents</h2>
							</Link>
						</div>
						<div className="carousel row">
							<div className="carousel__container">
								{this.state.location.residents.map((character, id) => (
									<div className="carousel-item" key={id}>
										<img
											className="carousel-item__img"
											src={character.image}
											alt={character.name}
										/>
										<div className="carousel-item__details">
											<h4 className="carousel-item__details--title">
												{character.name}
											</h4>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</main>
		);
	}
}

export default Location;
