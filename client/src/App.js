import './App.css';
import LadingPage from './views/LadinPage';
import { Switch, Route } from 'react-router-dom'
import Home from './views/Home';
import Detail from './views/Detail';
import FormPage from './views/FormPage'


function App() {
  return (
    <Switch>
        <Route exact path='/'>
            <LadingPage />
        </Route>
         <Route exact path='/home'>
            <Home/>
        </Route> 
         <Route exact path='/detail/:id' >
            <Detail/>
          </Route> 
        <Route exact path='/form'>
            <FormPage/>
        </Route>
        {/* <Route path="*">
            <NotFound404 />
          </Route>    */}
    </Switch>
  );
}

export default App;