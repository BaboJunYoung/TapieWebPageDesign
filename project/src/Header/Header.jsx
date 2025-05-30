import { useNavigate, Outlet } from "react-router-dom";
import styles from "./Header.module.css";

function Header({ isLogIn, userName, onLogout }) {
  const navigate = useNavigate();

  const handleLogIOClick = () => {
    if (isLogIn) {
      onLogout && onLogout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div id={styles.screenContainer}>
      <header id={styles.header}>
        <div
          id={styles.title}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          TAPIE Board
        </div>
        <div id={styles.container}>
          <div id={styles.userName}>{isLogIn ? userName : null}</div>
          <button
            id={styles.logIOButton}
            style={{
              backgroundColor: isLogIn ? "#FFA4A4" : "#FFFFFF",
            }}
            onClick={handleLogIOClick}
          >
            <img
              id={styles.logIOImage}
              src={isLogIn ? "/logOut.svg" : "/logIn.svg"}
              alt={isLogIn ? "로그아웃" : "로그인"}
            />
            <div id={styles.logIOText}>
              {isLogIn ? "로그아웃" : "로그인"}
            </div>
          </button>
        </div>
      </header>
      <div id={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default Header;
/*
 export : 요소를 내보낼 때 사용. (반대로는 import)
 export default : 단일요소를 내보낼 때 주로 사용. ( 명확히 하나만 있음을 보여주기 위해 주로 사용됨 )
 export function Header() {...} 형식도 된다네요
*/