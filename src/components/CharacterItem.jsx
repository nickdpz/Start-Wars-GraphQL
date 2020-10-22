import React from 'react';
import './styles/CharacterItem.css';

const ProductItem = (props) => {
	const { character } = props;
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
								props.handlerName(props.character.id);
							}}
						>
							{character.name}
						</span>
						<span className="status mx-3">
							<span className="status__icon"></span> {character.status}
						</span>
					</div>
					<div className="section">
						<span className="text-gray">Last known location:</span>
						<a
							href={`https://rickandmortyapi.com/api/location/${character.episode[0].id}`}
							rel="nofollow noopener noreferrer"
							target="_blank"
							className="mx-3"
						>
							{character.location.name}
						</a>
					</div>
					<div className="section">
						<span className="text-gray">First seen in:</span>
						<a
							href={`https://rickandmortyapi.com/api/episode/${character.episode[0].id}`}
							rel="nofollow noopener noreferrer"
							target="_blank"
							className="mx-3"
						>
							{character.episode[0].name}
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductItem;
