import * as request from "./requester";

const BASE_URL = "http://localhost:3030/data/games";

export const getAll = async () => {
	const result = await request.get(BASE_URL);
	const games = Object.values(result);

	return games;
};

const getLatestGames = async () => {
	const urlSearchParams = new URLSearchParams({
		sortBy: '_createdOn desc',
		pageSize: 3,
	});

	const result = await request.get(`${BASE_URL}?${urlSearchParams.toString()}`);
	const latestGames = Object.values(result);

	return latestGames;
};

export const getOne = (gameId) => request.get(`${BASE_URL}/${gameId}`);

const create = (gameData) => request.post(`${BASE_URL}`, gameData);
const remove = (gameId) => request.del(`${BASE_URL}/${gameId}`);
const update = (gameId, gameData) =>
	request.put(`${BASE_URL}/${gameId}`, gameData);

const gamesAPI = {
	getOne,
	getAll,
	create,
	remove,
	update,
	getLatestGames,
};

export default gamesAPI;
