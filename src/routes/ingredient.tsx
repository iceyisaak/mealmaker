import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ingredient')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ingredient"!</div>
}
