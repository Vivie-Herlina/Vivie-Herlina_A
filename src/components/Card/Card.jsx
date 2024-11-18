import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import { Link } from "react-router-dom";

export default function Card({ product }) {
  return (
    <Link
      to={`/products/${product.slug}` ?? ""}
      className="flex flex-col max-w-[370px] flex-wrap p-[16px] bg-[#EAF4F4] hover:ring-opacity-40 active:ring-5 active:ring-[#9B7EBD] hover:ring-4 active:ring-2 active:ring-opacity-90"
    >
      <div className="flex flex-col max-w-[370px] flex-wrap p-[16px] bg-[#EAF4F4]">
        <img
          src={product.imageUrl ?? ""}
          alt={product.name ?? "No name"}
          className="block max-h-[300px] mb-4 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-[20px] text-[#1D3557]">
            {product.name ?? "No Name"}
          </h4>
          <span className="block font-medium text-[14px] text-[#457B9D]">
            {product.category ?? "Uncategorized"}
          </span>
          <span className="block font-medium text-[20px] text-[#1D3557]">
            {formatToIDRCurrency(product.price) ?? "Not for sale"}
          </span>
          <div>
            {product.stock <= 0 ? (
              <p className="text-xl font-semibold text-center text-[#E63946]">
                Out of Stock
              </p>
            ) : product.stock <= 25 && product.stock !== 0 ? (
              <>
                <p className="text-xl font-semibold text-center text-[#F4A261]">
                  Almost Sold Out
                </p>
                <Button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 p-4 bg-[#2A9D8F] text-center hover:bg-[#1D8070] text-white active:bg-[#136956]"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                  <span>Add to cart</span>
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-[#2A9D8F] text-center hover:bg-[#1D8070] text-white active:bg-[#136956]"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                <span>Add to cart</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  product: PropTypes.object,
};
