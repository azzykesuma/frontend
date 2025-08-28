import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/main-game/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/main-game/"!</div>
}
