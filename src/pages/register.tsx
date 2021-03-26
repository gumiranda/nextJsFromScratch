/* eslint-disable jsx-a11y/label-has-associated-control */
import api from '@/services/api';

export default function Register() {
  const registerUser = async (event) => {
    event.preventDefault();

    const res = await api.post('/api/register',
      {
        email: event.target.email.value,
      });

    alert(JSON.stringify(res.data));
    // result.user => 'Ada Lovelace'
  };

  return (
    <form onSubmit={registerUser}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="text" autoComplete="email" required />
      <button type="submit">Register</button>
    </form>
  );
}
