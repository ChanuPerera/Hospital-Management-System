import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "@mui/icons-material";
// import { hover } from '@testing-library/user-event/dist/hover';
import { ChevronRight } from "@mui/icons-material";
import { Search, Menu, Logout } from "@mui/icons-material";
import axios from 'axios';
import config from '../../config';


/////////// Fine code with RESPONSIVE AND NAVIGATION Fixed ////////


const SideNav = () => {
  const [activeLink, setActiveLink] = useState("");
  const [activeSublink, setActiveSublink] = useState("");
  const [opacity, setOpacity] = useState(0);
  const animationDuration = 100;
  const location = useLocation(); // Get the current location object
  const path = location.path;

 

  const navLinks = [
    {
      cat: "Dashboard",
      listname : "Dashboard",
      name: "Dashboard",
      state: "isActiveDashboard",
      icon: "GridViewRounded",
      link: "AdminDashboard",
    },
    {
      cat: "Doctor",
      listname : "Doctor",
      name: "Doctor",
      state: "isActiveDoctor",
      icon: "Person",
      link: "Doctor",
    },
    {
        cat: "Patients",
        listname : "Patients",
        name: "Patients",
        state: "isActivePatients",
        icon: "WheelchairPickup",
        link: "Patient",
      },
      {
        cat: "Appointments",
        listname : "Appointments",
        name: "Appointments",
        state: "isActiveAppointments",
        icon: "AssignmentInd",
        link: "Appointment",
      },
      {
        cat: "Wards",
        listname : "Wards",
        name: "Wards",
        state: "isActiveWards",
        icon: "LocalHospital",
        link: "Ward",
      },
     
   
  ];



  useEffect(() => {
    const pathname = location.pathname;

    const matchingSublink = navLinks
      .filter((link) => link.sublinks)
      .find((link) => link.sublinks.some((sublink) => pathname.startsWith(`/${sublink}`)));

    if (matchingSublink) {
      setActiveSublink(pathname.split('/')[1]); // Set the active sublink based on the current pathname
      setActiveLink(matchingSublink.name); // Set the active link
    } else {
      const matchingNavLink = navLinks.find((link) =>
        pathname.startsWith(`/${link.link}`)
      );

      if (matchingNavLink) {
        setActiveLink(matchingNavLink.name);
      } else {
        setActiveLink("AdminDashboard");
      }
    }
  }, [location]);




  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };


  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);



  const handleLinkClick = (linkName) => {
    
  if(linkName === "Dashboard" || linkName === "Doctor" )
    {
      setIsSideNavOpen(false);
      setActiveLink(linkName);
    }

   
  };

  const handleSublinkClick = (sublinkName) => {
    setActiveSublink(sublinkName); // Set the active sublink
    setIsSideNavOpen(false);
  };

  const renderNavLink = (link, index) => {
    const isActive = activeLink === link.name;
    const stateKey = link.state;
    const Icon = Icons[link.icon];
    

    return (
      <li key={link.name} className="parent-link">
        {index < 5 && (
          <li className="nav-head">
            <div className="nav-head-category w-full sm:h-[36px] justify-start items-center px-8 hidden lg:flex ">
              <span className="uppercase sm:text-[12px] text-[#627BFE] font-semibold ">
                {link.cat}
              </span>
            </div>
          </li>
        )}

        <div className="w-full relative">
          <Link to={`/${link.link}`}>
            <li
              className={`child-link cursor-pointer ${isActive ? "child-link-active" : "child-link-Inactive"
                }`}
              onClick={() => handleLinkClick(link.name)}
            >
              <div className="child-link-outter-1 w-full sm:h-[48px] flex flex-row items-center text-center hover:text-white">
                <div className="child-link-outter-2 lg:w-[75%] w-[80%] sm:w-auto px-6 sm:px-0 lg:px-6 h-[48px]  rounded-[6px] justify-start items-center flex flex-row mx-auto">
                  <div className="sm:w-[32px] sm:h-[32px] rounded-[4px] flex justify-center items-center lg:mr-[16px] sm:mr-0 mr-[16px]">
                    <span className="ico-span text-[14px] text-[#565656]">
                      {" "}
                      <Icon />{" "}
                    </span>
                  </div>
                  <span className="link-label capitalize sm:text-[16px] text-[#565656] font-semibold  block sm:hidden lg:block">
                    {link.listname}
                  </span>
                </div>
              </div>
            </li>
          </Link>


          <Link to={`/${link.link}`}>
            <li
              className={`child-link cursor-pointer absolute top-0 w-full ${isActive ? "child-link-Inactive" : "child-link-active"
                }`}
              onClick={() => handleLinkClick(link.name)}
            >
              <div className="child-link-outter-1 w-full h-[48px] flex flex-row items-center text-center ">
                <div className="child-link-bar w-[6px] h-[40px] bg-[#627BFE] lg:mr-[30px] md:mr-[10px] mr-[16px]"></div>
                <div className="child-link-outter-2 lg:w-[75%] w-[80%] sm:w-auto px-6 sm:px-0 lg:px-6 lg:h-[48px] h-[32px] border-[#627BFE] bg-gradient-to-r from-[#627BFE] to-[#3D56DA] text-white lg:border-[1px] border-[1px] sm:border-0 rounded-[6px] justify-start items-center flex flex-row ">
                  <div className="ico-box w-[32px] h-[32px] rounded-[4px] flex justify-center items-center lg:mr-[16px] sm:mr-0 mr-[16px]">
                    <span className="ico-span text-[14px] text-[#ffffff]">
                      {" "}
                      <Icon />{" "}
                    </span>
                  </div>
                  <span className="link-label capitalize sm:text-[16px] text-[#ffffff] font-semibold block sm:hidden lg:block ">
                    {link.listname}
                  </span>
                </div>
              </div>
            </li>
          </Link>





        </div>
      </li>
    );
  };

  // Slice the first 3 items from the navLinks array
  const displayedNavLinks = navLinks.slice(0, 5);
  const remainingNavLinks = navLinks.slice(5); // Get the rest of the links
  
  const handleSignout = async () => {
    try {
        // Remove token and userRole from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');

        console.log('Token and userRole removed from localStorage.');

        // Redirect to the home page
        window.location.href = '/';
    } catch (error) {
        console.error('Signout error:', error);
    }
};

  return (



    <div className={`flex  ${isSideNavOpen ? "sidenav-open" : ""}`}>
      <div className={`res-sidenav lg:w-1/6 md:w-[80px] h-full fixed flex flex-col bg-[#FFFFFF] 
        border-[#565656] border-collapse border-r-[1px] border-opacity-10
      z-10 w-full backdrop-blur-md bg-opacity-90 sm:bg-opacity-100 sm:backdrop-blur-0 overflow-y-scroll sm:overflow-hidden ${isSideNavOpen ? "sidenav-open" : ""}`}>
            <div className="nav-logo font-link w-full lg:flex justify-center hidden ">
                    <span className="text-[4rem]  text-[#627BFE] font-link">e-</span><span className="text-[4rem]  text-[#002459] font-link">Doc</span>
                </div>
        <ul className="flex flex-col w-full space-y-3 ">
          <li>
            
          </li>
          {displayedNavLinks.map((link, index) => renderNavLink(link, index))}
          {remainingNavLinks.map((link, index) =>
            renderNavLink(link, index + 5)
          )}{" "}

          
            <div 
            onClick={handleSignout}
            className="signout-btn child-link-outter-1 w-full sm:h-[48px] flex flex-row items-center text-center hover:text-white cursor-pointer">
              <div className="child-link-outter-2 lg:w-[75%] w-[80%] sm:w-auto px-6 sm:px-0 lg:px-6 lg:h-[48px] h-[32px]  rounded-[6px] justify-start items-center flex flex-row mx-auto">
                <div className="sm:w-[32px] sm:h-[32px] rounded-[4px] flex justify-center items-center lg:mr-[16px] sm:mr-0 mr-[16px]">
                  <span className="ico-span text-[14px] text-[#565656]">
                    <Logout />
                  </span>
                </div>
                <span className="link-label capitalize sm:text-[16px] text-[#565656] font-semibold  block sm:hidden lg:block">
                  SignOut
                </span>
              </div>
            </div>
          

        </ul>
      </div>
      <div
        className={`h-[56px] lg:ml-[300px] md:ml-[80px] bg-[#151515] flex flex-row w-full justify-start items-center space-x-5 fixed top-0 z-30 sm:hidden`}
      >
        <span
          className="Menu-btn text-[16px] text-[#FFA524] ml-5 z-30"
          onClick={toggleSideNav}
        >
          <Menu />
        </span>
      </div>
    </div>


  );
};

export default SideNav;
