import { EditPanel, PageHeader } from "@/components"
import { getUsers } from "@/lib/prismaActions"

export default async function Edit() {
	const usersList = await getUsers()
	if (!usersList) return null

	const sortedUsers = [...usersList].sort((a, b) =>
		a.id.localeCompare(b.id, undefined, { numeric: true })
	)
	return (
		<div>
			<PageHeader headerContent='Edycja użytkowników' />
			{sortedUsers.map((user) => {
				return (
					<EditPanel
						key={user.id}
						user={user}
					/>
				)
			})}
		</div>
	)
}
