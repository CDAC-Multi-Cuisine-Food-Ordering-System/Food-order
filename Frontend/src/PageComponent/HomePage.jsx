import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import FoodCard from '../FoodComponent/FoodCard'
import Carousel from './Carousel'
import Footer from '../NavbarComponent/Footer'

const HomePage = () => {
  const { categoryId, categoryName } = useParams()
  const [foods, setFoods] = useState([])
  const [searchText, setSearchText] = useState('')
  const [tempSearchText, setTempSearchText] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response

        if (categoryId == null && searchText === '') {
          // Fetch all foods
          response = await axios.get(`http://localhost:8080/api/food/fetch/all`)
        } else if (searchText) {
          // Fetch foods by name
          response = await axios.get(
            `http://localhost:8080/api/food/search?foodName=${searchText}`
          )
        } else {
          // Fetch foods by category
          response = await axios.get(
            `http://localhost:8080/api/food/fetch/category-wise?categoryId=${categoryId}`
          )
        }
        if (response.data) {
          setFoods(response.data.foods)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [categoryId, searchText])

  const searchFoods = (e) => {
    e.preventDefault()
    setSearchText(tempSearchText)
  }

  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <div className="d-flex aligns-items-center  mt-5">
        <form class="row g-3">
          <div class="col-auto">
            <input
              type="text"
              class="form-control"
              id="inputPassword2"
              placeholder="Enter Food Name..."
              onChange={(e) => setTempSearchText(e.target.value)}
              style={{
                width: '350px',
              }}
              value={tempSearchText}
              required
            />
          </div>
          <div class="col-auto">
            <button
              type="submit"
              class="btn bg-color custom-bg-text mb-3"
              onClick={searchFoods}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="col-md-12 mt-3 mb-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {foods.map((food) => {
            return <FoodCard item={food} key={food.id} />
          })}
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  )
}

export default HomePage
