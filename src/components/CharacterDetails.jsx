import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import BeatLoader from 'react-spinners/BeatLoader';
import api from '../utils/api';
import { css } from '@emotion/core';
import './styles/CharacterDetails.css';

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

			console.log(data);
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
		console.log(this.props);
	}
	handleClose = () => {
		this.setState({ show: false });
		this.props.handleClose();
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
								<>
									<div className="d-flex justify-content-center">
										<img
											src={this.state.character.image}
											alt={this.state.character.name}
											className="rounded-circle"//img-rounded
										/>
									</div>
									<div className="col-12">
										<h4>{this.state.character.name}</h4>
									</div>
								</>
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
