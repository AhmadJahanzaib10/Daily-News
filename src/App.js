import React, { useState} from 'react';
import './bootstrap.min.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

const App = (props) =>{
  const [progress, setProgress] = useState(0);
  const setProgs = (prog) => {
    setProgress(prog);
  }
  return (
      <>
      <LoadingBar
        color='#4B56D2'
        progress={progress}
      />
        <Navbar />
        <News setProgress={setProgs} pageSize={9} country="us" category={props.category} key={props.key}/>
      </>
    )
};
export default App;