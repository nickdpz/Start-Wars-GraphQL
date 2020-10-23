import React, { Component } from 'react';
import api from '../utils/api';
import { css } from '@emotion/core';
import MoonLoader from 'react-spinners/MoonLoader';
import './styles/Home.css';
import './styles/Episodes.css';
const override = css`
	display: block;
	margin: 0 auto;
	border-color: blue;
`;

class Episode extends Component {
	state = {
		loading: true,
		error: false,
		episode: {},
	};
	fetchData = async (id) => {
		this.setState({ loading: true, error: null });
		try {
			let data = await api.getEpisode(this.props.match.params.episodeId);
			console.log(data.episodesByIds[0]);
			this.setState({
				loading: false,
				error: null,
				episode: data.episodesByIds[0],
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
					<h1 className="title-page text-white">Rick And Morty Episodes</h1>
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
					<div className="container container-color">
						<div className="row d-flex justify-content-center align-items-center justify-content-lg-between">
							<h1 className="title-episode">{`${this.state.episode.name}  -  ${this.state.episode.episode}`}</h1>
                            <h2>
                                {`Air Date ⭐ ${this.state.episode.air_date}`}
                            </h2>
						</div>
						<div className="carousel row">
							<div className="carousel__container">
								{this.state.episode.characters.map((character, id) => (
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

export default Episode;
