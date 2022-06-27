import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './contents.js'
import { getBasecontent, getLocalcontent, setLocalcontent, setBasecontent,setRemotecontent, getRemotecontent } from './contents.js';
const diff = require('diff');

setLocalcontent(require('./jsonfiles/local.json'));
setBasecontent(require('./jsonfiles/base.json'));
setRemotecontent(require('./jsonfiles/remote.json')); 
function App() {
  function saveEdittedBaseFile(){
    var spantags = (document.getElementById("basefile").getElementsByTagName("span"));
    var str ='';
    for(var i=0;i<spantags.length;i++)
    {
      str+= spantags[i].innerHTML.split("<br>")[0];
    }
    setBasecontent(str);
    alert("saved")
  }
  function cancelOperation(){
    alert("cancelled");
  }
  var Localcontent = JSON.stringify(getLocalcontent(),null,4);
  var Basecontent = JSON.stringify(getBasecontent(),null,4); 
  var Remotecontent = JSON.stringify(getRemotecontent(),null,4);
  var diffdetails = diff.diffJson(Localcontent,Remotecontent);
  var basehtml = jsontohtml(Basecontent,true);
  var localhtml = jsontohtml(Localcontent,false);
  var remotehtml = jsontohtml(Remotecontent,false);

  function jsontohtml(filecontent,isbasefile) {
    var filecontentarray = filecontent.split("\n");
    var content = [];
    if(isbasefile)
    {
      filecontentarray.forEach(element => {
        var con = {};
        con['line'] = element;
        con['colour'] = 'white';
        content.push(con)
      })
      return content;
    }
    filecontentarray.forEach(element => {
      var con = {};
      var isdiff = false;
      diffdetails.forEach(diff => {
        console.log(element.trim())
        console.log(diff)
        console.log(element.trim() === (diff.value).trim())
        if(element.trim() === diff.value.trim() && (diff.added || diff.removed))
        {
          isdiff =true;
          con['line'] = element;
          if(diff.added)
          {
            con['colour'] = 'green';
          }
          else if(diff.removed)
          {
            con['colour'] = 'red';
          }
          else
          {
            con['colour'] = 'white';
          }
          content.push(con)
        }
      })
      if(!isdiff)
      {
        con['line'] = element;
        con['colour'] = 'white';
        content.push(con)
      }
    });
  
    return content;
  }

  return (
    <div className="App">
      <header className="App-header">
        Code diff
      </header>
      <div className="App-body">
        <table>
          <tr>
            <th>Local file</th>
            <th>Base file</th>
            <th>Remote file</th>          
          </tr>
          <tr>
            <td>
              {
                localhtml.map((element)=>{
                  return <span  className={element.colour}>{element.line} <br/></span>
                })
              }
            </td>
            <td id="basefile" contentEditable>
              {
                basehtml.map((element)=>{
                  return <span  className={element.colour}>{element.line} <br/></span>
                })
              }
            </td>
            <td>
              {
                remotehtml.map((element)=>{
                  return <span  className={element.colour}>{element.line} <br /></span>
                })
              }
            </td>
          </tr>
        </table>
    
        <div className='button-wrapper'>
          <button name="submit" className="submit-button" onClick={saveEdittedBaseFile}>
            submit
          </button>
          <button name="cancel" className='cancel-button' onClick={cancelOperation}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
