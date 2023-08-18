import React, {useEffect, useState} from 'react';
import { getSubscriptionDetails } from '../../services/adminApi';
import SubscriptionsTable from '../../components/admin/SubscriptionsTable';
import NavBar from '../../components/navBar';
import AdminLayout from '../../components/Layout';

export default function Subscriptions() {
  const [Subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    getSubscriptionDetails()
      .then((res) => {
        setSubscriptions(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AdminLayout>
    <div>
      <SubscriptionsTable data={Subscriptions} />
    </div>
    </AdminLayout>
  );
}