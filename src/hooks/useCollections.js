import React from 'react';
import firestore from '@react-native-firebase/firestore';

const useCollections = (collection, collection1, limit, orderBy, rank) => {
  const [exp, setExp] = React.useState([]);
  const [reve, setReve] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    firestore()
      .collection(collection)
      .onSnapshot(querySnapshot => {
        const expense = [];
        querySnapshot.forEach(doc => {
          expense.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setExp(expense);
      });
    firestore()
      .collection(collection1)
      .orderBy(orderBy, rank)
      .limit(limit)
      .onSnapshot(querySnapshot => {
        const revenue = [];
        querySnapshot.forEach(doc => {
          revenue.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setReve(revenue);
      });
  };
  return {
    exp,
    reve,
    setExp,
    setReve,
  };
};

export default useCollections;
