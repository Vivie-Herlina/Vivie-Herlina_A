import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import getAllProducts from "../../services/getAllProducts";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const allProducts = getAllProducts();
    const product = allProducts.find((prod) => prod.slug === slug);
    setProduct(product);
  }, []);

  if (!product) {
    return (
      <>
        <h1 className="flex w-full h-full text-center items-center justify-center text-4xl text-[#FF5C5C]">
          PRODUCT NOT FOUND.
        </h1>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="flex px-24 py-4 gap-[48px] items-center">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeftLong} className="mb-0 text-[40px] text-[#457B9D]" />
        </Link>
        <h4 className="text-[32px] font-medium text-[#1D3557]">{product.name ?? "No Label"}</h4>
      </div>
      <div className="flex gap-[30px] px-24">
        <div>
          <img
            src={product.imageUrl ?? (product.name ?? "No Name")}
            alt={product.name ?? "No Name"}
            className="block w-[700px] h-[500px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          <span className="text-[40px] font-medium text-[#1D3557]">
            {formatToIDRCurrency(product.price) ?? `Not For Sale`}
          </span>
          {product.stock > 0 ? (
            product.stock <= 25 ? (
              <span className="font-medium text-[#E9C46A]">Available, almost out of stock</span>
            ) : (
              <span className="font-medium text-[#2A9D8F]">Available</span>
            )
          ) : (
            <span className="font-medium text-[#E76F51]">Out of stock</span>
          )}

          <span className="text-[#6C757D]">{product.category ?? "Uncategorized"}</span>

          {product.stock > 0 ? (
            <div>
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-[#2A9D8F] text-center hover:bg-[#1D8070] text-white active:bg-[#136956]"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0 text-white" />
                <span className="text-white">Add to cart</span>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-[#A9A9A9] text-center"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0 text-white" />
                <span className="text-[#EDEDED]">Add to cart</span>
              </Button>
            </div>
          )}

          <span className="font-medium text-[#1D3557]">Description</span>
          <p className="max-w-[500px] text-[#6C757D]">{product.description ?? "No description."}</p>
        </div>
      </div>
    </>
  );
}
