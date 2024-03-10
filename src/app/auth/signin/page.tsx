import { authenticate } from '@/app/lib/actions';

export default function SignupPage() {

  return (
    <form action={authenticate}>
      <input type="text" name="usernameOrEmail" placeholder="Email Only" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
