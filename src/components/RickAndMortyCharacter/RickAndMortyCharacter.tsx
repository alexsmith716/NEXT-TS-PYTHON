import React from 'react';
import { Character } from '../../apollo/generated/react-apollo';

import { Thumbnail, ThumbnailImage } from '../../styles';

function RickAndMortyCharacter({character, index}: {character: Character; index: number}) {
	return (
		<div className="cursor-pointer">
			<Thumbnail>
				{character.image ? (
					//@ts-ignore
					<ThumbnailImage src={character.image} alt={character.name} />
				) : (
					<div className="text-center">
						<i>Image not found</i>
					</div>
				)}
			</Thumbnail>
			<div className="text-center">
				{character.name ? <h4>{character.name} <span><h5>{index+1}</h5></span></h4> : <i>Name not found</i>}
			</div>
		</div>
	);
};

export default RickAndMortyCharacter;
