import { PageHeader } from '@/components'

export default async function Home() {
	return (
		<>
			<PageHeader headerContent={'Witamy w Car Shop!'} />
			<p className='my-3'>Wybierz opcję z menu.</p>
		</>
	)
}
