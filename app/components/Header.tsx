import { Link } from '@remix-run/react';


type Props = {
	next: number | undefined;
	prev: number | undefined;
};

export function Header({ next, prev }: Props) {
	return (
		<div className="bg-slate-50 h-16 fixed w-full block flex justify-between p-4">	
			{!!prev && (
				<Link to={{ hash: `#blog-${prev}` }}  reloadDocument>
					<span>
						Previous
					</span>
				</Link>
			)}
			{!prev && (
				<span></span>
			)}
			{!!next && (
				<Link to={{ hash: `#blog-${next}` }} reloadDocument>
					<span>
						Next
					</span>
				</Link>
			)}
			{!next && (
				<span></span>
			)}
		</div>
	);
}