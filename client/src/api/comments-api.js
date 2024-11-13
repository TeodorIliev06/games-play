import * as request from "./requester"

const BASE_URL = 'http://localhost:3030/jsonstore/games';

const buildUrl = (gameId) => `${BASE_URL}/${gameId}/comments`;

const create = async (gameId, username, text) => await request.post(buildUrl(gameId), { username, text });

const getAll = async (gameId) => {
    const result = await request.get(buildUrl(gameId));

    const comments = Object.values(result);

    return comments;
}

const commentsAPI = {
    create,
    getAll,
};

export default commentsAPI;
