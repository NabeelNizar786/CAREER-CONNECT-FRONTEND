import React, { useEffect, useState } from "react";
import AllPostFilter from "../../components/employer/AllPost.jsx/AllPostFilter";
import EmpPosts from "../../components/employer/home/EmpPosts";
import { getPostData,skillData,cityData } from "../../services/EmpApi";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import NewJobPost from "../../components/employer/home/NewJob";
import EmpNavBar from "../../components/employer/EmpNavbar";

export default function AllPost() {
    const [posts, setPosts] = useState([]);
    const [skills, setSkills] = useState([]);
    const [citys, setCitys] = useState([]);
    const [status, setStatus] = useState("Active");
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(showLoading());
      skillData()
        .then((res) => {
          setSkills(res.data.skillData);
        })
        .catch((err) => {
          console.log(err);
        });
      cityData()
        .then((res) => {
          setCitys(res.data.cityData);
        })
        .catch((err) => {
          console.log(err);
        });
      getPostData()
        .then((res) => {
          dispatch(hideLoading());
  
          setPosts(res.data.postData);
        })
        .catch((err) => {
          dispatch(hideLoading());
          console.log(err);
        });
    }, []);

    const logOut = () => {
        dispatch(showLoading());
        localStorage.removeItem('empJwt');
        setTimeout(() => {
          dispatch(hideLoading());
          Navigate('/employer/empLogin');
          toast.success('LOGOUT SUCCESSFULLY')
        }, 1000); // Change the delay time as per your preference
      };

     const isAuthenticated = true;
  
    const data = posts.filter((data) => data.status == status);
  
    return (
      <div>
        <EmpNavBar isAuthenticated={isAuthenticated} logOut = {logOut}/>
        <div className="flex  items-center md:mx-24 mx-3 mt-9 justify-end">
          <NewJobPost skills={skills} citys={citys} setPosts={setPosts} />
        </div>
        <AllPostFilter set={setStatus} status={status} />
        {data.length != 0 ? (
          <>
            <div className="md:mx-10">
              <EmpPosts
                posts={data}
                skills={skills}
                citys={citys}
                setPosts={setPosts}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center mt-20">
            <h1 className="text-3xl font-bold">
              You Dont Have Any {status} Posts
            </h1>
          </div>
        )}
      </div>
    );
  }
  