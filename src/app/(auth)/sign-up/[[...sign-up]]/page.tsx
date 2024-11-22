import { SignUp } from '@clerk/nextjs'
import { div } from '@tensorflow/tfjs'

export default function Page() {
  return (
<div className="min-h-screen pt-10">
<div className="flex justify-center">

<div >
  <SignUp />
</div>
</div>
</div>

  )
}