import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import { skillData, cityData, getActivePostData } from '../../services/EmpApi';
import NewJobPost from '../../components/employer/home/NewJob';
import ViewAllPost from '../../components/employer/home/ViewAllPosts';
import EmpPosts from '../../components/employer/home/EmpPosts';
import EmpNavBar from '../../components/employer/EmpNavbar';

function EmployerHome() {


  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthenticated = true;

  const [skills, setSkills] = useState([]);
  const [citys, setCitys] = useState([]);
  const [posts, setPosts] = useState([]);

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
    getActivePostData()
    .then((res)=> {
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

  return (
    <>
    <EmpNavBar isAuthenticated={isAuthenticated} logOut = {logOut}/>
    <div className='bg-blue-200 py-2'>
      <div className="flex flex-row items-center md:mx-20 mx-3 justify-between">
        <div className="md:text-4xl font-black   ">WELCOME BACK, EMPLOYER</div>
          <NewJobPost skills={skills} citys={citys} setPosts={setPosts} />
      </div>

      <ViewAllPost/>
      {posts.length != 0 ? (
        <>
          <div>
            <EmpPosts
              posts={posts.filter((post) => post.status == "Active")}
              skills={skills}
              citys={citys}
              setPosts={setPosts}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center mt-20">
          <h1 className="text-3xl font-bold">You Dont Have Any Active Posts</h1>
        </div>
      )}
    </div>
    </>
  );
}

export default EmployerHome;
