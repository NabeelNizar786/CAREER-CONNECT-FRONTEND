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
import PreModal from '../../components/employer/home/PreModal';
import ReactPaginate from 'react-paginate';


function EmployerHome() {

  const empData = useSelector((state) => state.emp.empData);

  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthenticated = true;

  const [skills, setSkills] = useState([]);
  const [citys, setCitys] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

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
      setTotalCount(res.data.totalCount)
      setPosts(res.data.postData);
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
    getActivePostData(page, limit)
    .then((res) => {
      dispatch(hideLoading())
      setPosts(res.data.postData)
    })
    .catch((err) => {
      dispatch(hideLoading());
      console.log(err);
    });
  }
  

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
        <div className="md:text-4xl font-black   ">WELCOME BACK, Employer</div>
        {empData.postCount <= 0 || empData.isPremium == true ? (
          <NewJobPost skills={skills} citys={citys} setPosts={setPosts} />
        ) : (
          <div>
            <PreModal />
          </div>
        )}
      </div>

      <ViewAllPost/>
      {posts && posts.length !== 0 ? (
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
    </div>
    </>
  );
}

export default EmployerHome;
