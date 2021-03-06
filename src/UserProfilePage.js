import React, {useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import "./app.css"
import { type } from "@testing-library/user-event/dist/type";
import ClubsAdvisor from "./ClubsAdvisor";
import Modal from "react-bootstrap/Modal";
import { Button} from 'react-bootstrap';
import Manage from "./managers/ManagerFacade";
import { updatePassword } from "firebase/auth";

function UserProfilePage() {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [joinedClubs, setJoinedClubs] = useState("");
    const [advisingClub, setAdvisingClub] = useState("");
    const [clubAdvisor, setClubAdvisor] = useState("");
    const [bio, setBio] = useState("");
        const [email, setEmail] = useState("");
    const [data, setData]= useState();
    const history = useNavigate();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);
    const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow6 = () => setShow6(true);
  const handleClose6 = () => setShow6(false);
  const handleShow = () => setShow(true);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleShow2 = () => setShow2(true);

  const changePass = async () => {
    var p = document.getElementById("passF").value;
    await updatePassword(auth.currentUser, p);
  }

  const addEvent = async () => {
    var q = document.getElementById("quotaF").value
    var n = document.getElementById("eventNameF").value
    var d = document.getElementById("dateF").value
    var t = document.getElementById("timeF").value
    var l = document.getElementById("locationF").value
    var de = document.getElementById("descriptionF").value
    var du = document.getElementById("durationF").value
    var ty = document.getElementById("typeF").value
    await Manage("club").addEventRequest(d, t, l, n, user.email, q, clubAdvisor, de, du, "", false, ty)
  }

  const changeStudentBio = async () => {
    var b = document.getElementById("bioF").value
    await Manage("student").editProfile(name, b);
  }

  const changeClubBio = async () => {
    var b = document.getElementById("bioF").value
    await Manage("club").changeClubInformation(b);
  }
    
    const fetchUsername = async () => {
        try {
            const docRef = doc(db, "users", user.email);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();

            if (docSnap.exists()) {
              //("Document data:", docSnap.data());
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
            setAdvisingClub(data.advisingClub)
            setName(data.name);
            setRole(data.type);
            
            setEmail(user.email);
            setData(data);

        } catch(err) {
            console.log(err);
            alert("Fetch error");
        }

        
        if(role === "student")
        {
          setJoinedClubs(data.joinedClubs);
          
        }
        else if(role === "advisor")
        {
          setAdvisingClub(data.advisingClub);
        }
        else if(role === "club")
        {
          setClubAdvisor(data.clubAdvisor);
        }
    }
   
    useEffect(async() => {
      if(loading) return;
      if (!user) return history("/");
      await fetchUsername().then(() => {
        setBio(data.type == "student"? data.biography: data.description);
      })
    }, [user, loading]);
    

    if(role === "student")
    {
          return (<>
            <div class="main-body">
  
            <nav class="navbar navbar-expand-sm navbar-dark navbar-custom">
  
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      
        <a class="navbar-brand mt-2 mt-lg-0" href="#">
          <img
            src="https://w3.bilkent.edu.tr/logo/ing-amblem.png"
            height="35"
            alt="MDB Logo"
            loading="lazy"
          />
        </a>
      
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/first">Event List</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/calendar">Calendar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/clubs">Clubs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/finance">Finance</a>
          </li>
        </ul>

      </div>
    
      <div class="d-flex align-items-center">
      <div class="navbar-text username-css">{name}</div>
          <a href="/userprofilepage">
            <img
            src="https://png.pngitem.com/pimgs/s/238-2388363_comment-from-static-noise-profile-picture-vector-hd.png"
            class="rounded-circle"
            height="35"
            alt="Black and White Portrait of a Man"
            loading="lazy"
            />
          </a>
          <button type="button" class="btn btn-primary logout-button" onClick={logout}>Logout</button>
      </div>
      
      </div>
      </nav>
            
            
            <div class="container giveSpace">      
      
            <div class="row gutters-sm">
              <div class="col-md-4 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      
                      <img
                      src="https://png.pngitem.com/pimgs/s/238-2388363_comment-from-static-noise-profile-picture-vector-hd.png"
                      class="rounded-circle"
                      max width="200"
                      max height="200"
                      alt="Black and White Portrait of a Man"
                      loading="lazy"
                      />
  
                      <div class="mt-3">
                        <h4>{name}</h4><br/>
                        <button class="btn btn-primary" onClick={handleShow6}>Change Password</button><br/><br/>
                        <Modal show={show6} onHide={handleClose6}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="popup-info-container">
        <div className="popup-info-holder">
            <div>New Password:</div>
            <input type="text" name="event name" id="passF"/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={changePass}>
            Change
          </Button>
          <Button variant="secondary" onClick={handleClose6}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
                        <button class="btn btn-outline-primary"onClick={handleShow5}>Edit Profile</button>

                        <Modal show={show5} onHide={handleClose5}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="popup-info-container">
        <div className="popup-info-holder">
            <div>Bio:</div>
            <input type="text" name="event name" id="bioF"/>
            </div>
              
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={changeStudentBio}>
            Change
          </Button>
          <Button variant="secondary" onClick={handleClose5}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card mt-3">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0"><h4><strong>User Information</strong></h4></h6>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0"><strong>Full Name:</strong></h6>
                      <span class="text-secondary">{name}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0"><strong>Mail:</strong></h6>
                      <span class="text-secondary">{email}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0"><strong>Joined Clubs:</strong></h6>
                      <span class="text-secondary">{(joinedClubs + "")}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0"><strong>Role:</strong></h6>
                      <span class="text-secondary">{role}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="d-flex align-items-center mb-3"><h4><strong>Notifications:</strong></h4></h6>
                          NOTIFICATIONS GO HERE <br/>
                        </div>
                    </div>
                    
                    
                  </div>
                 </div>
                
                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="row">
                      <div class="col-sm-3">
                        <h6 class="d-flex align-items-center mb-3"><h4><strong>About:</strong></h4></h6>
                           {bio}
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div></>
      );
    }
    else if(role === "advisor")
    {
      return (<>
        <div class="main-body">
  
        <nav class="navbar navbar-expand-sm navbar-dark navbar-custom-advisor">
 
  <div class="container-fluid">
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src="https://w3.bilkent.edu.tr/logo/ing-amblem.png"
          height="35"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
     
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/eventlistadvisor">Event List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/clubsclub">Clubs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/finance">Finance</a>
        </li>
      </ul>

    </div>
    

   
    <div class="d-flex align-items-center">
    <div class="navbar-text username-css">{name}</div>
        <a href="/userprofilepage">
          <img
          src="https://www.nicepng.com/png/detail/137-1379898_anonymous-headshot-icon-user-png.png"
          class="rounded-circle"
          height="35"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />
        </a>
        <button type="button" class="btn btn-primary logout-button" onClick={logout}>Logout</button>
        
      
    </div>
    
  </div>
</nav>
        
        
        <div class="container giveSpace">      
  
        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  
                  <img
                  src="https://png.pngitem.com/pimgs/s/238-2388363_comment-from-static-noise-profile-picture-vector-hd.png"
                  class="rounded-circle"
                  max width="200"
                  max height="200"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                  />
  
                  <div class="mt-3">
                    <h4>{name}</h4><br/>
                    <button class="btn btn-primary">Change Password</button><br/><br/>
                    <button class="btn btn-outline-primary">Edit Profile</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mt-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><h4><strong>User Information</strong></h4></h6>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><strong>Full Name:</strong></h6>
                  <span class="text-secondary">{name}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><strong>Mail:</strong></h6>
                  <span class="text-secondary">{email}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><strong>Advising Club:</strong></h6>
                  <span class="text-secondary">{(advisingClub + "")}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><strong>Role:</strong></h6>
                  <span class="text-secondary">{role}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="d-flex align-items-center mb-3"><h4><strong>Notifications:</strong></h4></h6>
                      NOTIFICATIONS GO HERE <br/>
                    </div>
                </div>
                
                
              </div>
             </div>
            
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                  <div class="col-sm-3">
                    <h6 class="d-flex align-items-center mb-3"><h4><strong>About:</strong></h4></h6>
                      INFO ABOUT 
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div></>
      );
    }
    else if(role === "club")
    {
      return (<>
        <div class="main-body">
  
        <nav class="navbar navbar-expand-sm navbar-dark navbar-custom-clubmanager">
 
  <div class="container-fluid">
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src="https://w3.bilkent.edu.tr/logo/ing-amblem.png"
          height="35"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
     
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/eventlistclub">Event List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/calendarclub">Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/clubsclub">Clubs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/finance">Finance</a>
        </li>
      </ul>

    </div>
    

   
    <div class="d-flex align-items-center">
    <div class="navbar-text username-css">{name}</div>
        <a href="/userprofilepage">
          <img
          src="https://www.nicepng.com/png/detail/137-1379898_anonymous-headshot-icon-user-png.png"
          class="rounded-circle"
          height="35"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />
        </a>
        <button type="button" class="btn btn-primary logout-button" onClick={logout}>Logout</button>
        
      
    </div>
    
  </div>
</nav>
       
<div class="container giveSpace">      
  
  <div class="row gutters-sm">
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="d-flex flex-column align-items-center text-center">
            
            <img
            src="https://png.pngitem.com/pimgs/s/238-2388363_comment-from-static-noise-profile-picture-vector-hd.png"
            class="rounded-circle"
            max width="200"
            max height="200"
            alt="Black and White Portrait of a Man"
            loading="lazy"
            />

            <div class="mt-3">
              <h4>{name}</h4><br/>
              <button class="btn btn-primary" onClick={handleShow4}>Change Password</button><br/><br/>
              <Modal show={show4} onHide={handleClose4}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="popup-info-container">
        <div className="popup-info-holder">
            <div>New Password:</div>
            <input type="text" name="event name" id="passF"/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={changePass}>
            Change
          </Button>
          <Button variant="secondary" onClick={handleClose4}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
              <button class="btn btn-outline-primary" onClick={handleShow3}>Edit Profile</button>
              <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="popup-info-container">
        <div className="popup-info-holder">
            <div>Bio:</div>
            <input type="text" name="event name" id="bioF"/>
            </div>
              
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={changeClubBio}>
            Change
          </Button>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
          </div>
        </div>
      </div>
      <div class="card mt-3">
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 class="mb-0"><h4><strong>User Information</strong></h4></h6>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 class="mb-0"><strong>Full Name:</strong></h6>
            <span class="text-secondary">{name}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 class="mb-0"><strong>Mail:</strong></h6>
            <span class="text-secondary">{email}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 class="mb-0"><strong>Current Advisor:</strong></h6>
            <span class="text-secondary">{clubAdvisor}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 class="mb-0"><strong>Role:</strong></h6>
            <span class="text-secondary">{role}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-8">
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="d-flex align-items-center mb-3"><h4><strong>Notifications:</strong></h4></h6>
                NOTIFICATIONS GO HERE <br/>
              </div>
          </div>
          
          
        </div>
       </div>
       <div class="row gutters-sm">
       <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
              <h6 class="d-flex align-items-center mb-3"><h4><strong>About:</strong></h4></h6>
                {bio} 
              </div>
              </div>
          </div>

          <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
              <h6 class="d-flex align-items-center mb-3"><h4><strong>Add/Delete Club Events:</strong></h4></h6>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="popup-info-container">
        <div className="popup-info-holder">
            <div>Event Name:</div>
            <input type="text" name="event name" id="eventNameF"/>
            </div>
            <div className="popup-info-holder">
            <div>Date:</div>
            <input type="text" name="date" id="dateF"/>
            </div>
            <div className="popup-info-holder">
            <div>Time:</div>
            <input type="text" name="time" id="timeF"/>
            </div>
            <div className="popup-info-holder">
            <div>Location:</div>
            <input type="text" name="location" id="locationF"/>
            </div>
            <div className="popup-info-holder">
            <div>Description:</div>
            <input type="text" name="description" id="descriptionF"/>
            </div>
            <div className="popup-info-holder">
            <div>Duration:</div>
            <input type="text" name="duration" id="durationF"/>
            </div>
            <div className="popup-info-holder">
            <div>Quota:</div>
            <input type="text" name="quota" id="quotaF"/>
            </div>
            <div className="popup-info-holder">
            <div>EventType:</div>
            <input type="text" name="eventType" id="typeF"/>
            </div>
            
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addEvent}>
            Add Event
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="popup-info-container">
            <div className="popup-info-holder">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <div>
                  <Button variant="primary" size="sm" onClick={handleClose}>
            Delete
          </Button>
          </div>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <div>
                  <Button variant="primary" size="sm" onClick={handleClose}>
            Delete
          </Button>
          </div>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <div>
                  <Button variant="primary" size="sm" onClick={handleClose}>
            Delete
          </Button>
          </div>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            Set Budget
          </Button>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
              <button class="btn btn-primary" onClick={handleShow}>Add Event</button><br/><br/>
              <button class="btn btn-outline-primary" onClick={handleShow2}>Delete Event</button>
              </div>
              </div>
          </div>

          </div>
          
        </div>
      </div>
  </div>
</div></>
      );
    }
    else if(role === "admin")
    {
      return (<>
        <div class="main-body">
  
        <nav class="navbar navbar-expand-sm navbar-dark navbar-custom-admin">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <a class="navbar-brand mt-2 mt-lg-0" href="/first">
                <img
                  src="https://w3.bilkent.edu.tr/logo/ing-amblem.png"
                  height="35"
                  alt="MDB Logo"
                  loading="lazy"
                />
              </a>

              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="/admin">Manage Events</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/manageclubs">Manage Clubs</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/manageprofiles">Manage Profiles</a>
                </li>
              </ul>
            </div>

            <div class="d-flex align-items-center">
            <div class="navbar-text username-css">{name}</div>
              <img
                src="https://www.nicepng.com/png/detail/137-1379898_anonymous-headshot-icon-user-png.png"
                class="rounded-circle"
                height="35"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
              <button type="button" class="btn btn-primary logout-button" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
        
        
        <div class="container giveSpace">      
  
        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  
                  <img
                  src="https://png.pngitem.com/pimgs/s/238-2388363_comment-from-static-noise-profile-picture-vector-hd.png"
                  class="rounded-circle"
                  max width="200"
                  max height="200"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                  />
  
                  <div class="mt-3">
                    <h4>John Doe</h4>
                    <p class="text-secondary mb-1">Full Stack Developer</p>
                    <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                    <button class="btn btn-primary">Follow</button>
                    <button class="btn btn-outline-primary">Message</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mt-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                  <span class="text-secondary">https://bootdey.com</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                  <span class="text-secondary">bootdey</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                  <span class="text-secondary">@bootdey</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                  <span class="text-secondary">bootdey</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                  <span class="text-secondary">bootdey</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0"><strong>Full Name:</strong></h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                  {name} 
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0"><strong>Role:</strong></h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                      {role}
                  </div>
                </div>
              </div>
             </div>
            
            <div class="row gutters-sm">
              <div class="col-sm-6 mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      INFO ABOUT 
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div></>
      );
    }
    else
    {
      return <div>loading...</div>;
    }
  }
  export default UserProfilePage;