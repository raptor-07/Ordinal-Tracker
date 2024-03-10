import { addUserAction } from '@/app/lib/actions';
 
export default function SignupPage() {
 
  return (
    <form action={addUserAction}>
      <input type="username" name="username" placeholder="User Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  )
}