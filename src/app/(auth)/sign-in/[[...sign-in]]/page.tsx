import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (

    <div className="min-h-screen pt-10">
<div className="flex justify-center">

<div >
  <SignIn />
</div>
</div>
</div>
  )
}