import {useEffect, useMemo, useState} from 'react';
import { useLocation, useNavigate } from '@remix-run/react';


type Props = {
  ids: number[],
};

export default function useScrolling({ ids }: Props) {

  const location = useLocation();
  const [current, setCurrent] = useState<number | undefined>();
  const navigate = useNavigate();


  const [next, prev ] = useMemo(() => {

    let next;
    let prev;

    if (current) {
      const currentIndex = ids.indexOf(current);
      next = ids[currentIndex + 1];
      prev = ids[currentIndex - 1];
    }

    return [ next, prev ];
  }, [current, ids]);



  function scrollToHash(hash: string) {
    const id = parseInt(hash.replace('#blog-', ''));
    const el = document.querySelector(hash);
    if (el) {
      
      setCurrent(id);    
    
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }


  useEffect(() => {
    if (location.hash) {
      scrollToHash(location.hash);
    }
  }, [location.hash]);


  useEffect(() => {
    if (ids && ids.length && !current) {
     if (location.hash) {
       scrollToHash(location.hash);
     } else {
       setCurrent(ids[0]);
     }
    }
  }, [ids]);



  return { current, next, prev };
}
