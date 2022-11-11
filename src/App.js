import './App.css';
import Date from './Components/Date'
import PlaceList from './Components/Place/List'
import PlaceEdit from './Components/Place/Edit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<PlaceList />} />
          <Route path='/List' element={<PlaceList />} />
          <Route path='/Date' element={<Date />} />
          <Route path='/Edit' element={<PlaceEdit />} />
          <Route path='/New' element={<PlaceEdit />} />


        </Routes>
      </Router>
      pawel
      <Date />
    </div>
  );
}

export default App;
