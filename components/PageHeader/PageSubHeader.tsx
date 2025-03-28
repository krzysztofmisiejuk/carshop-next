export default function PageSubHeader({
	headerContent,
}: {
	headerContent: string;
}) {
	return <h3 className=" my-3.5 text-xl font-bold">{headerContent}</h3>;
}
