import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "../../hooks/useForm"
import gamesAPI, { getOne } from "../../api/games-api";
import { useGetOneGames } from "../../hooks/useGames";

const initialValues = {
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: '',
};

export default function GameEdit() {
    const navigate = useNavigate()
    const { gameId } = useParams();
    const [game, setGame] = useGetOneGames(gameId);

    const initialFormValues = useMemo(() => Object.assign({}, initialValues, game), [game])
    const {
        changeHandler,
        submitHandler,
        values,
        errors
    } = useForm(initialFormValues, async (values) => {
        await gamesAPI.update(gameId, values);

        navigate(`/games/${gameId}/details`);
    })
    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={submitHandler}>
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input onChange={changeHandler} type="text" id="title" name="title" value={values.title} />
                    {errors.title && <p className="error">{errors.title}</p>}

                    <label htmlFor="category">Category:</label>
                    <input onChange={changeHandler} type="text" id="category" name="category" value={values.category} />
					{errors.category && <p className="error">{errors.category}</p>}

                    <label htmlFor="levels">MaxLevel:</label>
                    <input onChange={changeHandler} type="number" id="maxLevel" name="maxLevel" min="1" value={values.maxLevel} />
					{errors.maxLevel && <p className="error">{errors.maxLevel}</p>}

                    <label htmlFor="game-img">Image:</label>
                    <input onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} />
					{errors.imageUrl && <p className="error">{errors.imageUrl}</p>}

                    <label htmlFor="summary">Summary:</label>
                    <textarea onChange={changeHandler} name="summary" id="summary" value={values.summary}></textarea>
					{errors.summary && <p className="error">{errors.summary}</p>}

                    <input className="btn submit" type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    )
}
