import gql from 'graphql-tag';

export const typeDefs = gql`
	type Query {
		helloWorld: String

		# Get a specific character by ID
		character(id: ID!): Character

		# Get the list of all characters
		characters(page: Int, filter: FilterCharacter): Characters

		# Get a list of characters selected by ids
		charactersByIds(ids: [ID!]!): [Character]

		# Get a specific locations by ID
		location(id: ID!): Location

		# Get the list of all locations
		locations(page: Int, filter: FilterLocation): Locations

		# Get a list of locations selected by ids
		locationsByIds(ids: [ID!]!): [Location]

		# Get a specific episode by ID
		episode(id: ID!): Episode

		# Get the list of all episodes
		episodes(page: Int, filter: FilterEpisode): Episodes

		# Get a list of episodes selected by ids
		episodesByIds(ids: [ID!]!): [Episode]

		books: [Book]!

		authors: [Author]!
	}

	type Mutation {
		addBook(name: String!, authorName: String): AddBookResponse!

		addAuthor(name: String!): AddAuthorResponse!
	}

	type Author {
		id: ID!
		name: String!
		books: [Book!]!
	}

	type Book {
		id: ID!
		name: String!
		author: Author
	}

	type AuthorExists {
		message: String!
	}

	type AuthorNotFound {
		message: String!
	}

	type AuthorNameMissing {
		message: String!
	}

	union AddBookResponse = Book | AuthorNotFound | AuthorNameMissing
	union AddAuthorResponse = Author | AuthorExists

	#
	type Character {
		# The id of the character.
		id: ID

		# The name of the character.
		name: String

		# The status of the character ('Alive', 'Dead' or 'unknown').
		status: String

		# The species of the character.
		species: String

		# The type or subspecies of the character.
		type: String

		# The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
		gender: String

		# The character's origin location
		origin: Location

		# The character's last known location
		location: Location

		# Link to the character's image.
		# All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
		image: String

		# Episodes in which this character appeared.
		episode: [Episode]!

		# Time at which the character was created in the database.
		created: String
	}

	#
	type Location {
		# The id of the location.
		id: ID

		# The name of the location.
		name: String

		# The type of the location.
		type: String

		# The dimension in which the location is located.
		dimension: String

		# List of characters who have been last seen in the location.
		residents: [Character]!

		# Time at which the location was created in the database.
		created: String
	}

	#
	type Episode {
		# The id of the episode.
		id: ID

		# The name of the episode.
		name: String

		# The air date of the episode.
		air_date: String

		# The code of the episode.
		episode: String

		# List of characters who have been seen in the episode.
		characters: [Character]!

		# Time at which the episode was created in the database.
		created: String
	}

	#
	input FilterCharacter {
		#
		name: String

		#
		status: String

		#
		species: String

		#
		type: String

		#
		gender: String
	}

	#
	type Characters {
		#
		info: Info

		#
		results: [Character]
	}

	#
	type Info {
		# The length of the response.
		count: Int

		# The amount of pages.
		pages: Int

		# Number of the next page (if it exists)
		next: Int

		# Number of the previous page (if it exists)
		prev: Int
	}

	#
	input FilterLocation {
		#
		name: String

		#
		type: String

		#
		dimension: String
	}

	#
	type Locations {
		#
		info: Info

		#
		results: [Location]
	}

	#
	input FilterEpisode {
		#
		name: String

		#
		episode: String
	}

	#
	type Episodes {
		#
		info: Info

		#
		results: [Episode]
	}
`;
