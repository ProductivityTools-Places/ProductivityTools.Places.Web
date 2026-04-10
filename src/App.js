import './App.css';
import Date from './Components/Date'
import PlaceList from './Components/Place/List'
import PlaceNew from './Components/Place/New';
import PlaceItem from './Components/Place/Item';
import Login from './Session/login'
import { AuthProvider } from './Session/AuthContext'


import VisitEdit from './Components/Visit/Edit';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {



  return (

    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/Login' element={<Login />} />
            <Route path='/' element={<PlaceList />} />
            <Route path='/List' element={<PlaceList />} />
            <Route path='/Date' element={<Date />} />
            <Route path='/New' element={<PlaceNew />} />
            <Route path='/Item/:id' element={<PlaceItem />} />
            {/* <Route path='/VisitNew' element={<VisitEdit />} />
          <Route path='/VisitEdit' element={<VisitEdit />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
      <Date />
    </div>

  );
}

export default App;

