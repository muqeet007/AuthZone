import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AutContext'

function Profile() {
    const { user } = useContext(AuthContext);
  
    return (
      <>
        {user != null && (
          <section>
            <div className="w-full h-screen bg-gray-100 px-10 pt-10">
              <div className="relative mb-32 max-w-sm mx-auto mt-24">
                <div className="rounded overflow-hidden shadow-md bg-white">
                  <div className="absolute -mt-20 w-full flex justify-center"></div>
                  <div className="px-6 mt-16">
                    <h1 className="font-bold text-3xl text-center mb-1">{user.name}</h1>
                    <p className="text-gray-800 text-sm text-center">{user.email}</p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      Carole Steward is a visionary CEO known for her exceptional leadership and strategic acumen. With a
                      wealth of experience in the corporate world, she has a proven track record of driving innovation and
                      achieving remarkable business growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
  
export default Profile
