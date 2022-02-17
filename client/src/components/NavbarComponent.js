import {Link,withRouter} from "react-router-dom";
import { getUser,logout } from "../servies/authorize";
const NavbarComponent=(props)=>{
    return(
        <nav>
            <ul className="nav nav-tabs"> 
                <li className="nav-item pt-3 pb-3">
                    <Link to="/" className="nav-link">หน้าแรก</Link>
                </li>
                <li className="nav-item pt-3 pb-3">
                    <Link to="/blogs" className="nav-link">ดูบทความ</Link>
                </li>
                {getUser() &&(
                    <li className="nav-item pt-3 pb-3">
                        <Link to="/create" className="nav-link">เขียนบทความ</Link>
                    </li>
                    )
                }
                {!getUser() &&(
                    <li className="nav-item pt-3 pb-3">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    )
                }
                {getUser() &&(
                    <li className="nav-item pt-3 pb-3">
                        <button onClick={()=>logout(()=>props.history.push("/"))} className="nav-link">Logout</button>
                    </li>
                )
                }
            </ul>
        </nav>
    );
}
export default withRouter(NavbarComponent);