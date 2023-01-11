import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
function useFirestoreCollection(collection, pageSize, page) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState(null);
  const [search, setSearch] = useState();
  const [filteredDataSource, setFilteredDataSource] = useState();
  useEffect(() => {
    let unsubscribe;
    if (query) {
      setQueryLoading(true);
      unsubscribe = query.onSnapshot(
        querySnapshot => {
          const data = [];
          querySnapshot.forEach(doc => {
            data.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setData(data);
          setQueryLoading(false);
        },
        error => {
          setQueryError(error);
          setQueryLoading(false);
        },
      );
    } else {
      unsubscribe = collection.limit(pageSize).onSnapshot(
        collectionSnapshot => {
          const data = [];
          collectionSnapshot.forEach(doc => {
            data.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setData(data);
          setLoading(false);
        },
        error => {
          setError(error);
          setLoading(false);
        },
      );
    }
    return () => unsubscribe();
  }, [collection, query, pageSize, page]);
  const searchFilterFunction = text => {
    if (text) {
      const newData = data.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(data);
      setSearch(text);
    }
  };
  function refresh() {
    if (query) {
      setQueryLoading(true);
      query.get().then(
        querySnapshot => {
          const data = [];
          querySnapshot.forEach(doc => {
            data.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setData(data);
          setQueryLoading(false);
        },
        error => {
          setQueryError(error);
          setQueryLoading(false);
        },
      );
    } else {
      collection
        .limit(pageSize)
        .get()
        .then(
          collectionSnapshot => {
            const data = [];
            collectionSnapshot.forEach(doc => {
              data.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            setData(data);
            setLoading(false);
          },
          error => {
            setError(error);
            setLoading(false);
          },
        );
    }
  }

  function setCollectionQuery(newQuery) {
    setQuery(newQuery);
  }

  return {
    data,
    loading,
    error,
    queryLoading,
    queryError,
    refresh,
    setCollectionQuery,
    setData,
    searchFilterFunction,
    search,
    filteredDataSource,
  };
}

export default useFirestoreCollection;

const styles = StyleSheet.create({});
