import React from 'react'
import { Link } from 'react-router';

const ProductCard = ({ id, title, image, price, category, slug }) => {
    return (
        <Link to={`/products/${id}`} >
            <div className="bg-white shadow-md p-4 rounded-lg max-w-xs w-[20rem] h-[25rem] text-white flex flex-col justify-between">
                <img
                    src={image}
                    alt="Majestic Mountain Graphic T-Shirt"
                    className="rounded-t-lg h-[60%]"
                />
                {/* <div className="mt-4"> */}
                    <p className="text-gray-800 text-lg font-semibold">₹ {price} /-</p>
                    <p className="text-gray-600 font-medium">
                        {title} <br /> {category}
                    </p>
                {/* </div> */}
            </div>
        </Link>
    );
}

export default ProductCard