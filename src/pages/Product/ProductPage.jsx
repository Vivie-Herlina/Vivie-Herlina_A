import { useState, useEffect } from 'react';
import getAllProducts from '../../services/getAllProducts';
import CardList from '../../components/CardList/CardList';
import Navbar from '../../components/Navbar/Navbar';
import RadioButton from '../../components/RadioButton/RadioButton';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, '');
  };

  const handleSearch = (searchTerm) => {
    filterProducts(selectedCategory, searchTerm);
  };

  const filterProducts = (category, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === 'all' || product.category.toLowerCase() === category.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(lowerCaseSearchTerm);
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  };

  const RadioButtonOpts = [
    { label: 'All', value: 'all' },
    { label: 'Bedroom', value: 'bedroom' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Living Room', value: 'living room' },
  ];

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton
            options={RadioButtonOpts}
            defaultValue={'all'}
            onChange={(value) => handleCategoryChange(value)}
          />
        </div>
      </div>
      <section className="container px-24 py-4">
        <main className="grid grid-cols-4 gap-4">
          <CardList products={filteredProducts} />
        </main>
      </section>
    </>
  );
}
