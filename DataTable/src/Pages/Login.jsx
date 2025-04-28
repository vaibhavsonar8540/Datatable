
import React from 'react'


const Login = () => {

  return (
    <div style={{width:"20%",height:"350px"  , border:"1px solid black" , margin:"auto",textAlign:"center",alignItems:"center" , padding:"20px"} } className='mt-5'>
        <form action="" >
          <h1>Sign In</h1>
            <input type="email"  placeholder='Email'/> <br /><br />
            <input type="password"   placeholder='password'/><br /><br />
            <input type="submit" style={{marginTop:"30px"}}/>
        </form>
    </div>
  )
}

export default Login