import { PageHeader } from '@/components'

export default function NotFound() {
	return (
		<>
			<PageHeader headerContent='Błąd 404' />
			<p>Strona nie istnieje</p>
			<p>Wpisz poprawny adres URL</p>
		</>
	)
}
