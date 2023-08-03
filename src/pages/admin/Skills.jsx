import React,{useEffect, useState} from 'react';
import SkillsTable from '../../components/admin/SkillsTable';
import AddSkills from '../../components/admin/AddSkills';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { adminSkillDetails } from '../../services/adminApi';
import AdminLayout from '../../components/Layout';

export default function Skills() {
  const dispatch = useDispatch();
  const [skill, setSkill] = useState([]);
  const fetchData = () => {
    adminSkillDetails()
      .then((res) => {
        setSkill(res.data.skillData);
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };
  useEffect(() => {
    dispatch(showLoading());
    fetchData();
    dispatch(hideLoading());
  }, []);

  console.log(skill);
  return (
    <div>
      <AdminLayout>
      <AddSkills fetchData={fetchData} />
      <SkillsTable skillData={skill} />
      </AdminLayout>
    </div>
  );
}