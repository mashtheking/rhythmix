'use client';

const Greeting = () => {
  const getGreeting = () => {
    const hr = new Date().getHours();
    return `Good ${(hr < 12) ? 'Morning' : (hr < 18) ? 'Afternoon' : 'Evening'}`;
  }

  return (
    <h1 className="text-gray-900 text-3xl font-semibold">
      { getGreeting() }
    </h1>
  );
}
export default Greeting;