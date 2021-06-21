import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import MainContainer from "./components/Container/container.component";
import { setCurrentUser, setUserId } from "./redux/user/user.action";

const App = ({ setLoginData, setUserId, token }) => {
  // Loging in user and updating redux store with auth data
  useEffect(() => {
    axios
      .post("https://stage.api.sloovi.com/login", {
        email: "smithcheryl@yahoo.com",
        password: "12345678",
      })
      .then((response) => setLoginData(response.data.results));
  }, [setLoginData]);

  // fetching userId using JWT token from login and updating redux store
  useEffect(() => {
    if (token) {
      console.log(token);
      axios
        .get("https://stage.api.sloovi.com/user", {
          headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
        .then((response) => setUserId(response.data.results.id));
    }
  }, [token,setUserId]);

  //Main container contains the task app

  return (
    <div className="App">
      <div className='header'></div>
      <MainContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  setLoginData: (loginData) => dispatch(setCurrentUser(loginData)),
  setUserId: (userId) => dispatch(setUserId(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
