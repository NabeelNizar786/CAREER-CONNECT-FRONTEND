import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import NavBar from '../../components/navBar';
import JobSearch from '../../components/user/JobSearch';
import JobPost from '../../components/user/userJobPost/JobPost';
import { userGetAllPost } from '../../services/userApi';
import ReactPaginate from 'react-paginate';

function Home() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthenticated = true;

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPost] = useState([]);
  const [search, setSearch] = useState({
    city:[],
    skill:[],
  });

  const [totalCount, setTotalCount] = useState(0);

const handleSearch = (e) => {
  e.preventDefault();
  if (search.city.length === 0 && search.skill.length === 0) {
    toast.error('ENTER A VALUE');
  } else {
    dispatch(showLoading());
    setTimeout(() => {
      console.log('search.city:', search.city); // Add this line
      console.log('search.skill:', search.skill); // Add this line
      const filteredDocuments = allPosts.filter((post) => {
        const isCityMatch =
          search.city.length === 0 || search.city.some(city => city.value === post.location);
      
        const isSkillMatch =
          search.skill.length === 0 || search.skill.some(skill => post.skills.includes(skill.value));
      
        console.log('isCityMatch:', isCityMatch);
        console.log('isSkillMatch:', isSkillMatch);
      
        return isCityMatch && isSkillMatch;
      });
      
  
      console.log('filteredDocuments:', filteredDocuments); 
      setPosts(filteredDocuments);
      dispatch(hideLoading());
    }, 1000); 
  }
  }
  useEffect(() => {
    dispatch(showLoading());
    userGetAllPost()
      .then((res) => {
        dispatch(hideLoading());
        setPosts(res.data.postData);
        setAllPost(res.data.postData);
        setTotalCount(res.data.totalCount);
        console.log(res.data.postData);
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  }, []);

  const handlePagination = (data) => {
    dispatch(showLoading())
    const limit = 3;
    let page = data.selected + 1;
    userGetAllPost(page, limit)
    .then((res) => {
      dispatch(hideLoading())
      setPosts(res.data.postData)
      setAllPost(res.data.postData)
    })
    .catch((err) => {
      dispatch(hideLoading());
      console.log(err);
    });
  }

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

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={Math.ceil(totalCount / 3)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePagination}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <div className="mt
      -4">
      </div>
    </div>
  )
}

export default Home;
