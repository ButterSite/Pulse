import { Logo } from "../../Logo"
import { Link } from "react-router-dom"
export const DesktopHeader = () => {
    const token = localStorage.getItem(`jwtToken`);
    return (
        <header>
            <div>
                <Link to={`/`} ><Logo className="logo-header-container"></Logo></Link>

            </div>
            <div className="flex-space-container header-navigator">
                {!token ? 
                <>
                <Link to={`/login`}><p><b>Sign In</b></p></Link>
                <Link to={`/signup`}><p><b>Sign Up</b></p></Link>
                </>
                : 
                <></>
                }

                <Link to={`/home`}><p><b>Home</b></p></Link>
            </div>

        </header>
    )
}