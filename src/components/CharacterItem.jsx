import React from 'react';
import './styles/CharacterItem.css';
import { Link } from 'react-router-dom';

const ProductItem = (props) => {
	const { character } = props;

	const classStatus = (status) => {
		if (status === 'Alive') {
			return 'mx-3 text-success';
		} else if (status === 'Dead') {
			return 'mx-3 text-danger';
		} else {
			return 'mx-3 text-capitalize d-inline-block';//text-uppercase 
		}
	};
	return (
		<>
			<div className="character-card-container">
				<div className="character-card-container-images">
					<img src={character.image} alt="Cowboy Rick" />
				</div>
				<div className="character-card-container-description">
					<div className="section">
						<span
							className="button-tag"
							onClick={() => {
								props.handlerName(character.id, character.name);
							}}
						>
							{character.name}
						</span>
						<span className={classStatus(character.status)}>
							{character.status}
						</span>
					</div>
					<div className="section">
						<span className="text-gray">Last known location:</span>
						<Link
							to={`/locations/${character.location.id}`}
							className="mx-3"
						>
							{character.location.name}
						</Link>
					</div>
					<div className="section">
						<span className="text-gray">First seen in:</span>
						<Link
							className="mx-3"
							to={`/episodes/${character.episode[0].id}`}
						>
							{character.episode[0].name}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductItem;
