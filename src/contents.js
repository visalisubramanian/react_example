var Localcontent;
var Basecontent;
var Remotecontent;

function setLocalcontent (content) {
  Localcontent = content;
}
function setBasecontent (content) {
    console.log(JSON.parse(JSON.stringify(content)))
  Basecontent = content;
}
function setRemotecontent (content) {
  Remotecontent = content;
}
function getBasecontent(){
  return Basecontent;
}
function getLocalcontent(){
    return Localcontent;
}
function getRemotecontent() {
    return Remotecontent;
}

function setinFile(content) {

}
module.exports = {
    setBasecontent,
    setLocalcontent,
    setRemotecontent,
    getBasecontent,
    getLocalcontent,
    getRemotecontent,
    setinFile
}