import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localStorage.service';
import ProductCard from '../ProductCard';
import Search from '../../components/navbar/Search'

export default function ProductsDisplay() {

  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  let { category, style } = useParams()

  const ls = useLocalStorage();
  let user = ls.getUser();

  const http = useApi();

  function getProducts() {
    if (!category && !style) {
      http.getAllProducts()
        .then((response) => {
          console.log(category, style)
          setProducts(response.data.products);
        })
        .catch(() => {
          console.log("error getting all products");
        })
    } else if (category && !style) {
      console.log("sending req")
      http.getProductsByCategory(category)
        .then((response) => {
          console.log(response, 'hi')
          setProducts(response.data.products);
        })
        .catch(() => {
          console.log("error getting ", category);
          console.trace()
        })
    } else if (category && style) {
      http.getProductsByStyle(style)
        .then((response) => {
          console.log(response)
          setProducts(response.data.products);
        })
        .catch(() => {
          console.log("error getting ", style);
        })
    } else {
      console.error("There was an error getting any products")
    }
  }

  function onInputChanged(newQuery) {
    console.log(newQuery);
    setSearchQuery(newQuery)
  }

  useEffect(() => {
    getProducts();
    console.log('');
  }, [category, style, searchQuery]);



  function doesItemMatchSearchQuery(product) {
    let { name, color, brand, category, size, style } = product
    if (hasSubstringCaseInsensitive(name, searchQuery)) {
      return true;
      
    } else if (hasSubstringCaseInsensitive(brand, searchQuery)) {
      return true;
    } else if (hasSubstringCaseInsensitive(color, searchQuery)) {
      return true
    } else if (hasSubstringCaseInsensitive(category, searchQuery)) {
      return true
    } else if (hasSubstringCaseInsensitive(size, searchQuery)) {
      return true
    } else if (hasSubstringCaseInsensitive(style, searchQuery)) {
      return true 
    } else {
      return false;
    }
  }

  function hasSubstringCaseInsensitive(longString, subString) {

    longString = longString.toLowerCase()
      .replaceAll(' ', '')
      .replaceAll('-', '')
      .replaceAll("'", '');

    subString = subString.toLowerCase()
      .replaceAll(' ', '')
      .replaceAll('-', '')
      .replaceAll("'", '');

    return longString.includes(subString)
  }

  return (

    <div className="products-root">
      <h1 className='header'>Surfs Up! </h1>
      <div>
 <Search onChange={onInputChanged}></Search>
      </div>

      <div className='products-container'>
      {products.filter(product => {
          if (searchQuery == '') {
            return true

          }
          return doesItemMatchSearchQuery(product) 

        })
          .map(product => <ProductCard key={product.id} {...product} />)}
      </div>

      {/* array.map data => cards */}
    </div>
  );
}