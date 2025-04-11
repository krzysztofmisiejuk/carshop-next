Branch homework:

- keep fetched data in react context
- fetch data in client
- use Messages components as events notifications, also using context

Branch no-context:

- does not use the react context
- fetch data from API on server not client
- use revalidatePath fn in API and use routers from next/navigation for refreshing cache
- there are not Messages components, compare to branch homework (avoid using hooks)
- there are CustomLink components instead next/links - cache avoid in client side

Branch prisma-code:

- extend no-context branch with use prisma ORM for db connection

Branch chat-code

- extended prisma-code branch with chat as virtual assiatance - via openAI
- chat is allowed for all, not only for logged users
- implemented shacdn lib - chat components

Branch final-code (includes above branches):

- primsa ORM
- openAI
- react context for notifications
- Server Components and Client Components
- use nextAuth.js for authentication and login process - integrated external providers (github, google) and credentials provider(login via login form)

* jwt - for practising
