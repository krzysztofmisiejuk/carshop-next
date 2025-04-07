export default function PageHeader({
	headerContent,
}: {
	headerContent: string;
}) {
	return <h2 className=" my-3.5 text-2xl font-bold">{headerContent}</h2>;
}
