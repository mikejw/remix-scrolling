import type { MetaFunction } from '@remix-run/node';
import { useBlogs } from '~/hooks/useBlogs';
import { Link } from '@remix-run/react';
import useScrolling from '~/hooks/useScrolling';
import { useMemo } from 'react';
import { Header } from '~/components/Header';


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  const blogs = useBlogs();

  const ids = useMemo(() => {
    return (blogs.length) ? blogs.map(item => item.blog_id) : [];
  }, [blogs]);


  const { handleSetCurrent, next, prev } = useScrolling({ ids });

  const imgStyle = {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundImage: 'url(https://picsum.photos/200/300)'
  };


  return (
    <>
      <Header next={next} prev={prev} />
      <ul>
      {blogs.map(item => (
        <li key={item.blog_id} className="w-full p-0" id={`blog-${item.blog_id}`}>
          <Link to={`/blog/${item.blog_id}`}>
            <div className="bg-slate-100 h-screen" style={imgStyle}>
              <h2 className="w-full h-full flex items-center justify-center">
                <span className="bg-black text-white uppercase hover:italic">{`${item.blog_id} - ${item.heading}`}</span>
              </h2>
            </div>
          </Link>
        </li>
      ))}
      </ul>
    </>
  );
}
