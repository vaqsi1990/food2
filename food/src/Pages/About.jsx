import React from 'react'

export default function About() {
  return (
    <>
      <div class="container mx-auto px-4 mt-[150px] mb-[20px]">
          <div class="items-center flex flex-wrap">
            <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
              <img
                alt="..."
                class="max-w-full rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1600688640154-9619e002df30?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div class="md:pr-12">
               
                <h3 class="text-3xl font-semibold">Explore  recipes for every palate and occasion.</h3>
                <p class="mt-4 text-lg leading-relaxed text-gray-600">
                Our food recipe website is dedicated to providing you with a wide variety of delicious and easy-to-follow recipes for every occasion. 
                From quick weeknight meals to impressive dinner party dishes, we have got you covered. 
                Explore our collection of recipes from around the world and get inspired to create mouth-watering dishes in your own kitchen.
                </p>
                <ul class="list-none mt-6">
                  <li class="py-2">
                    <div class="flex items-center">
                      <div>
                        <span
                          class="text-xs  font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary mr-3"
                          ><i class="fas fa-fingerprint"></i
                        ></span>
                      </div>
                      <div>
                        <h4 class="text-gray-600">
                        Inspiring Recipes
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li class="py-2">
                    <div class="flex items-center">
                      <div>
                        <span
                          class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary mr-3"
                          ><i class="fab fa-html5"></i
                        ></span>
                      </div>
                      <div>
                        <h4 class="text-gray-600"> find a wide range of recipes for different dishes and cuisines</h4>
                      </div>
                    </div>
                  </li>
                  <li class="py-2">
                    <div class="flex items-center">
                      <div>
                        <span
                          class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary mr-3"
                          ><i class="far fa-paper-plane"></i
                        ></span>
                      </div>
                      <div>
                        <h4 class="text-gray-600">detailed instructions on how to prepare and cook each dish</h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    
    
    </>
  )
}
