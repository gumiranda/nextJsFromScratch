/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Register() {
  const registerUser = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/register', {
      body: JSON.stringify({
        email: event.target.email.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
    alert(JSON.stringify(result));
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
