export default function Footer() {
	const date: Date = new Date();
	return (
		<footer className='flex justify-center items-center  min-h-20 bg-custom-dark-blue text-white'>
			<p>
				Car Shop © <span>{date.getFullYear()}</span>
			</p>
		</footer>
	);
}
