import { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {

  const isMounted = useRef(true); 
  // la idea es que mantenga la referencia cuando el hook este montado o no

  const [state, setState] = useState({

    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {

      isMounted.current = false;
    }
  }, []);

  useEffect(() => {

    setState({data: null, loading: true, error:null }); //para que nos aparezca el loading

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
          
          if(isMounted.current){ 
  //podemos jugar con el ismounted si esta true es porque esta montado y si es false es porque no

            setState({
                
              loading: false,
              error: null,
              data,
            });
          }

      })
      .catch(() => {

        setState({
          data:null,
          loading: false,
          error: 'No se puede cargar la info'
        })
      })
  }, [url]);

  return state;
};
