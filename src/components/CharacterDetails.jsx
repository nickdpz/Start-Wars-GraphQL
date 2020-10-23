import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import BeatLoader from 'react-spinners/BeatLoader';
import api from '../utils/api';
import { css } from '@emotion/core';
import './styles/CharacterDetails.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

class CharacterDetails extends Component {
	state = {
		loading: true,
		error: false,
		character: {},
		show: true,
	};

	fetchData = async () => {
		this.setState({ loading: true, error: false });
		try {
			let data = await api.getCharacter(this.props.id);
			this.setState({
				loading: false,
				error: false,
				character: data.charactersByIds[0],
			});
		} catch (error) {
			this.setState({ loading: false, error: error });
		}
	};

	componentDidMount() {
		this.fetchData();
	}
	handleClose = () => {
		this.setState({ show: false });
		this.props.handleClose();
	};
	classStatus = (status) => {
		if (status === 'Alive') {
			return 'text-success';
		} else if (status === 'Dead') {
			return 'text-danger';
		} else {
			return 'text-capitalize d-inline-block'; //text-uppercase
		}
	};
	render() {
		return (
			<>
				<Modal show={this.state.show} onHide={this.handleClose} size="lg">
					<Modal.Header closeButton>
						<Modal.Title>{this.props.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="container-modal">
							{this.state.loading ? (
								<BeatLoader
									css={css`
										display: flex;
										justify-content: center;
										margin: 0 auto;
										border-color: blue;
									`}
									size={30}
									color={'#123abc'}
									loading={this.state.loading}
								/>
							) : (
								<div className="p-4">
									<div className="d-flex justify-content-center">
										<img
											src={this.state.character.image}
											alt={this.state.character.name}
											className="rounded-circle" //img-rounded
										/>
									</div>
									<div className="row col-12">
										<h3 className="text-primary mx-3">
											{this.state.character.name}
										</h3>
									</div>
									<div className="row mt-2">
										<div className="col-6 d-flex">
											<strong className="mr-2">Species </strong>
											<p>{this.state.character.species}</p>
										</div>
										<div className="col-6 d-flex">
											<strong className="mr-2">Status</strong>
											<p
												className={this.classStatus(
													this.state.character.status
												)}
											>
												{this.state.character.status}
											</p>
										</div>
									</div>
									<div className="row mt-2">
										<div className="col-6 d-flex">
											<strong className="mr-2">{'Creation Date'}</strong>
											<p>
												{moment(this.state.character.created).format(
													'DD/MM/YYYY'
												)}
											</p>
										</div>
										<div className="col-6 d-flex">
											<strong className="mr-2">Gender</strong>
											<p>{this.state.character.gender}</p>
										</div>
									</div>
									<div className="row">
										<div className="col-12 mt-2">
											<strong className="mr-2">Origin</strong>
										</div>
										<div className="col-9 mt-2">
											<Link to={`/locations/${this.state.character.location.id}`}>{`${this.state.character.origin.type} ${this.state.character.origin.name} ${this.state.character.origin.dimension}`}</Link>
										</div>
									</div>
									<div className="row">
										<div className="col-12 mt-2">
											<strong>Location Current</strong>
										</div>
										<div className="col-9 mt-2">
											<Link
												to={`/locations/${this.state.character.location.id}`}
											>{`${this.state.character.location.type} ${this.state.character.location.name} Dimension ${this.state.character.location.dimension}`}</Link>
										</div>
									</div>
									<div className="row">
										<div className="col-12 mb-2">
											<strong>{'Episodes 💫'}</strong>
										</div>
										<div className="col-12">
											{this.state.character.episode.map((episode) => (
												<Link
													key={episode.id}
													className="border-0 badge badge-pill badge-primary mx-2"
													to={`/episodes/${episode.id}`}
												>
													{episode.name}
												</Link>
											))}
										</div>
									</div>
								</div>
							)}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
export default CharacterDetails;
