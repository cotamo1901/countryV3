import './App.css';
import LadingPage from './views/LadingPage';

function App() {
  return (
    <Switch>
        <Route exact path='/'>
            <LadingPage />
        </Route>
        <Route exact path='/breeds'>
            <Home/>
        </Route>
        {/* <Route exact path='/detail/:id'>
            <Detail/>
          </Route>
        <Route exact path='/newBreed'>
            <CreateForm/>
        </Route>
        <Route path="*">
            <NotFound404 />
          </Route>  */}
    </Switch>
  );
}

export default App;