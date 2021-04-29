

const statsHandler = async() =>{
    document.getElementById("adminStats").style.display = "none";
  
    document.getElementById("loaderAdminStatus").style.display = "block";
  
    const response = await fetch("https://hack-6eddc.firebaseio.com/participants.json")
    const resData = await response.json()
    const dataLength = Object.keys(resData).length
    document.getElementById("totalUsers").innerHTML = "Total User : " + dataLength;
    console.log(Object.keys(resData).length);
    document.getElementById("loaderAdminStatus").style.display = "none";
    document.getElementById("adminStats").style.display = "block";
  
  }
  const settings = async() =>{
  }



  const userHandler = async() =>{
    document.getElementById("adminSubmissions").style.display = "none";
  
    document.getElementById("loaderAdminSunmissions").style.display = "block";
  
    const response = await fetch("https://hack-6eddc.firebaseio.com/teams.json")
    const resData = await response.json()
    var teamNameArr = Object.values(resData)
    var teamCodeArr = Object.keys(resData)
    console.log(teamCodeArr);

    
   
    document.getElementById("teamNames").innerHTML = ""
    for (var key in teamNameArr) {
      var subOneIdea = null
      var subOnePs = null
      var subSecondIdea = null
      var subSecondPs = null
      const response3 = await fetch(`https://hack-6eddc.firebaseio.com/roundOneSubmissions/${teamCodeArr[key]}.json`)
      const resData3 = await response3.json()
      const response4 = await fetch(`https://hack-6eddc.firebaseio.com/roundOneRejected.json`)
      const resData4 = await response4.json()
      const response5 = await fetch(`https://hack-6eddc.firebaseio.com/roundOneAccepted.json`)
      const resData5 = await response5.json()
      
      
      if(resData3){
      console.log(Object.values(resData3)[0].SubmissionOne.Idea);
      
      var submissionOne = Object.values(resData3)[0].SubmissionOne
      var submissionSecond = Object.values(resData3)[0].SubmissionSecond
      if(submissionOne){
      var subOneIdea = Object.values(resData3)[0].SubmissionOne.Idea
      var subOnePs = Object.values(resData3)[0].SubmissionOne.ProblemStatement
      }
      if(submissionSecond){
        var subSecondIdea = Object.values(resData3)[0].SubmissionSecond.Idea
        var subSecondPs = Object.values(resData3)[0].SubmissionSecond.ProblemStatement
        }
      }
      var teamMate = Object.keys(Object.values(Object.values(teamNameArr[key])[0])[0])[0]
     
      
     
    
      var x = key+1000
      var y = key-1000

      console.log(Object.keys(Object.values(Object.values(teamNameArr[key])[0])[0]))
        var teamMembersStr = Object.keys(Object.values(Object.values(teamNameArr[key])[0])[0]).toString().replace(/"dot"/g,"[dot]")
        var teamMatesArr = Object.entries(Object.values(Object.values(teamNameArr[key])[0])[0]).join(`</br>  `)
        console.log(teamMembersStr);
        document.getElementById("teamNames").innerHTML +=
        `
      
                        
                              
        <button class="accordion" onclick = "openAccordian()" style = "font-size:20px"><b>${Object.keys(teamNameArr[key])}</b></button>
        <div class="panel" id = "panel">
        <div id = "'${key}'"style = "display: none; margin-top: 3%;" class = "rejectedBtn"> 
          <button class = "ui  button" style = "width:18%;height:54%; color: white;text-decoration: none;margin:3% 86% ;background-color: #d9534f ;   " >Rejected</button>
        </div>
        <div id = "'${x}'"style = "display: none; margin-top: 3%;" class = "acceptedBtn">
          <button class = "ui purple button" style = "width:18%;height:54%; color: white;text-decoration: none;margin:3% 86% ;background-color: #5cb85c  !important;"  >Accepted</button>
        </div>
        <div id = "'${y}'"style = "display: flex; margin-top: 3%;" class = "rejectAccept">
          <button class = "ui  button" style = "width:18%;height:54%; color: white;text-decoration: none;margin:3% 62% ;background-color: #d9534f ;   " onclick = "roundOneReject('${teamMembersStr}','${key}')" >Reject</button>
          <button class = "ui purple button" style = "width:18%;height:54%; color: white;text-decoration: none;margin:3% -60% ;background-color: #5cb85c  !important;" onclick = "roundOneAccept('${teamMembersStr}','${key}')" >Accept</button>
        </div>
        <div style = "margin-top:-9%">
        <h2>Team members:</h2>

        <p> ${teamMatesArr}</p>
        </div>
        </br>
        <h3>Selected Problem Statement:</h3>
        <p>${subOnePs}</p>
        <h3>Proposed Idea:</h3>
        <p>${ subOneIdea}</p>
        </br>
        <h3>Selected Problem Statement:</h3>
        <p>${subSecondPs}</p>
        <h3>Proposed Idea:</h3>
        <p>${ subSecondIdea}</p>
        
        </div>
        
        `;   

        if(resData4){
          var array = Object.values(resData4)
          console.log("sdfghj",teamMate);
          for(var temp in array){
            if(teamMate === array[temp].mate){
              change(key)
              break
            }
          }
        }
        if(resData5){
          var array = Object.values(resData5)
          for(var temp in array){
            if(teamMate === array[temp].mate){
              changeAcc(key)
              break
            }
          }
        }
        
    }

    document.getElementById("loaderAdminSunmissions").style.display = "none";
    document.getElementById("adminSubmissions").style.display = "block";
  
  }



const openAccordian = () =>{
    var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
}

const logout = async() =>{

    localStorage.setItem("adminLoggedOut",true)
    window.location.replace('./auth.html')

  }



const roundOneReject = async(teamMatesArr,id) =>{
  var teamMatesArr = teamMatesArr.split(',')

 
  for(var key in teamMatesArr){
    var mate = teamMatesArr[key].replace(/[\[\]']+/g,'"')
    const response = await fetch('https://hack-6eddc.firebaseio.com/roundOneRejected.json',{
      method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      mate

      })
    })
  }
  change(id)
  
}


const roundOneAccept = async(teamMatesArr,id) =>{
  var teamMatesArr = teamMatesArr.split(',')

 
  for(var key in teamMatesArr){
    var mate = teamMatesArr[key].replace(/[\[\]']+/g,'"')
    const response = await fetch('https://hack-6eddc.firebaseio.com/roundOneAccepted.json',{
      method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      mate

      })
    })
  }
 changeAcc(id)
  
}


function change(id){
  var x = document.getElementsByClassName("rejectedBtn")[id].id; 
  var y = document.getElementsByClassName("rejectAccept")[id].id; 
  document.getElementById(y).style.display = "none"
  document.getElementById(x).style.display = "flex"
}


function changeAcc(id){
  var x = document.getElementsByClassName("acceptedBtn")[id].id; 
  var y = document.getElementsByClassName("rejectAccept")[id].id; 
  document.getElementById(y).style.display = "none"
  document.getElementById(x).style.display = "flex"
}