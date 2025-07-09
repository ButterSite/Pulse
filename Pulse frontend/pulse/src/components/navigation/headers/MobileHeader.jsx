
import { Link } from "react-router-dom"
export const MobileHeader = () => {
    const token = localStorage.getItem(`jwtToken`);
    return (
        <header>
            <div className="flex-space-container header-navigator">
                {!token ? 
                <>
                <Link to={`/login`}>
                <span class="material-symbols-outlined">
                home
                </span>
                </Link>
                <Link to={`/signup`}><p><b>Sign Up</b></p></Link>
                </>
                : 
                <></>
                }

                <Link to={`/home`}>   
                <span className="material-symbols-outlined">
                home
                </span>
                </Link>
                  <Link to={`/home`}>   
                <span className="material-symbols-outlined">
                groups_2
                </span>
                </Link>
            </div>

        </header>
    )
}