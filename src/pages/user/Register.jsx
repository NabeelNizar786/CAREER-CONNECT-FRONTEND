import NavBar from '../../components/navBar';
import google from '../../assets/google.png'
const Register = () => {

  const onFinish = (values) => {
    console.log("Recieved Values:", values);
  }

  const optionStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
  }

  return (
    <div>
      <NavBar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
      <div className="max-w-md w-full p-6 bg-blue-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 whitespace-nowrap"style={optionStyle}>LOGIN TO FIND YOUR PASSION</h1>
        <h1 className="text-3xl font-bold text-center mb-6 "style={optionStyle}>USER LOGIN</h1>
        <form onSubmit={onFinish}>
          <div className="mb-4">
            <label style={optionStyle} htmlFor="email" className="block font-bold">
              USERNAME:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:border-blue-500"
              name="email"
              placeholder='username'
              required
            />
          </div>
          <div className="mb-4">
            <label style={optionStyle} htmlFor="email" className="block font-bold">
              EMAIL:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:border-blue-500"
              name="email"
              placeholder='email'
              required
            />
          </div>
          <div className="mb-4">
            <label style={optionStyle} htmlFor="email" className="block font-bold">
              MOBILE NUMBER:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:border-blue-500"
              name="email"
              placeholder='mobile no'
              required
            />
          </div>
          <div className="mb-6">
            <label style={optionStyle} htmlFor="password" className="block font-bold">
              PASSWORD:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:border-blue-500"
              name='password'
              placeholder='password'
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              SIGNUP
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-4">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-500 mx-4">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex items-center justify-center mt-4">
            <img src={google} alt="Google Logo" className="h-6 mr-2" />
            <button className="bg-white text-gray-600 font-semibold py-2 px-4 rounded border border-gray-300 hover:bg-gray-100 focus:outline-none">
              Login with Google
            </button>
          </div>
          <p className="text-black-600 mt-6" style={optionStyle}>Already have a account ?
            <a href="/login" style={{ textDecoration: 'underline', marginLeft: '10px', color: 'rgba(0, 0, 255, 1.0)' }}>Login</a>
          </p>
      </div>
    </div>
    </div>
  );
};

export default Register;