import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import NavBar from '../../components/navBar';
import JobSearch from '../../components/user/JobSearch';
import JobPost from '../../components/user/userJobPost/JobPost';
import { userGetAllPost } from '../../services/userApi';

function Home() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthenticated = true;

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPost] = useState([]);
  const [search, setSearch] = useState({
    city:'',
    skill:''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(showLoading());
    setTimeout(() => {
      const filteredDocuments = allPosts.filter((post) => {
        const isCityMatch = search.city === '' || post.location === search.city;
        const isSkillMatch =
          search.skill === '' || post.skills.includes(search.skill);
        return isCityMatch && isSkillMatch;
      });
      setPosts(filteredDocuments);
      dispatch(hideLoading()); // Hide loading after filtering and updating posts
    }, 1000); 
  }

  useEffect(() => {
    dispatch(showLoading());
    userGetAllPost()
      .then((res) => {
        dispatch(hideLoading());
        setPosts(res.data.postData);
        setAllPost(res.data.postData);
        console.log(res.data.postData);
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  }, []);

  const logOut = () => {
    dispatch(showLoading());
    localStorage.removeItem('userJwt');
    setTimeout(() => {
      dispatch(hideLoading());
      Navigate('/user/login');
      toast.success('LOGOUT SUCCESSFULLY')
    }, 1000); // Change the delay time as per your preference
  };

  return (
    <div>
    <NavBar isAuthenticated={isAuthenticated} logOut = {logOut}/>
    <JobSearch setSearch={setSearch} handleSearch={handleSearch}/>
    <div className="bg-white h-3"></div>

    <div className="px-4 md:px-8 lg:px-16 xl:px-32">
      {posts.length !== 0 ? (
        <div className="text-3xl text-center text-blue-950 font-extrabold my-3">
          Latest Job Offers
        </div>
      ) : (
        <div className="text-3xl text-center mt-32 text-blue-950 font-extrabold my-3">
          oops No Job Posts avilable right now
        </div>
      )}
      {posts.length !== 0 && <JobPost posts={posts} />}
      </div>
    </div>
  )
}

export default Home;
