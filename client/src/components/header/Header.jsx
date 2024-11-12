import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1><Link class="home" href="#">GamesPlay</Link></h1>
            <nav>
                <Link href="#">All games</Link>
                <div id="user">
                    <Link href="#">Create Game</Link>
                    <Link href="#">Logout</Link>
                </div>
                <div id="guest">
                    <Link href="#">Login</Link>
                    <Link href="#">Register</Link>
                </div>
            </nav>
        </header>
    );
}
