import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/menu"); //http://localhost:8000/menu  //menu.json
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //   console.log(filteredItems);
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="flex flex-col items-center justify-center py-48">
          {/* content */}
          <div className="px-4 text-center space-y-7">
            <h2 className="text-4xl font-bold leading-snug md:text-5xl md:leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek SouthIndian Specials, Lasagne, Butternut Pumpkin, Tokusen
              Wagyu, Olivas Rellenas and more for a moderate cost
            </p>
            <button className="px-8 py-3 font-semibold text-white rounded-full bg-green btn">
              Order Now
            </button>

            <h2>All The Items Are Weighed 250g</h2>
          </div>
        </div>
      </div>

      {/* menu shop  */}
      <div className="section-container">
        <div className="flex flex-col flex-wrap items-center mb-8 space-y-3 md:flex-row md:justify-between">
          {/* all category buttons */}
          <div className="flex flex-row flex-wrap justify-start gap-4 md:items-center md:gap-8">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("SouthIndian Specials")}
              className={
                selectedCategory === "SouthIndian Specials" ? "active" : ""
              }
            >
              SouthIndian Specials
            </button>
            <button
              onClick={() => filterItems("SelfMade")}
              className={selectedCategory === "SelfMade" ? "active" : ""}
            >
              SelfMade
            </button>
            {/* 
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}
            >
              Drinks
            </button> */}
          </div>

          {/* filter options */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="p-2 bg-black ">
              <FaFilter className="w-4 h-4 text-white" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="px-2 py-1 text-white bg-black rounded-sm"
            >
              <option value="default"> Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* product card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2 ">
          {currentItems.map((item, index) => (
            <Cards key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
{
  /*,
  {
    "_id": "642c155b2c4774f05c36ee8a",
    "name": "Escalope de Veau",
    "recipe": "Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "dessert",
    "price": 12.5
  },
  {
    "_id": "642c155b2c4774f05c36ee96",
    "name": "Fish Parmentier",
    "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SelfMade",
    "price": 9.5
  },
  {
    "_id": "642c155b2c4774f05c36ee81",
    "name": "Tuna Niçoise",
    "recipe": "Warm goats cheese and roasted vegetable SouthIndian Specials with black olive tapenade crostini",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "offered",
    "price": 10.5
  },
  {
    "_id": "642c155b2c4774f05c36ee84",
    "name": "Roast Duck Breast",
    "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "dessert",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36eea4",
    "name": "Chicken and Walnut SouthIndian Specials",
    "recipe": "Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SouthIndian Specials",
    "price": 13.5
  },
  {
    "_id": "642c155b2c4774f05c36eea5",
    "name": "Fish Parmentier",
    "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "SouthIndian Specials",
    "price": 9.5
  },
  {
    "_id": "642c155b2c4774f05c36ee87",
    "name": "Chicken and Walnut SouthIndian Specials",
    "recipe": "Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "dessert",
    "price": 13.5
  },
  {
    "_id": "642c155b2c4774f05c36ee83",
    "name": "Chicken and Walnut SouthIndian Specials",
    "recipe": "Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "offered",
    "price": 13.5
  },
  {
    "_id": "642c155b2c4774f05c36ee7f",
    "name": "Roasted Pork Belly",
    "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "popular",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36eea8",
    "name": "Chicken and Walnut SouthIndian Specials",
    "recipe": "Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "SouthIndian Specials",
    "price": 13.5
  },
  {
    "_id": "642c155b2c4774f05c36eeba",
    "name": "Haddock",
    "recipe": "Chargrilled fresh tuna steak (served medium rare) on classic Niçoise SouthIndian Specials with French beans.",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "drinks",
    "price": 14.7
  },
  {
    "_id": "642c155b2c4774f05c36ee80",
    "name": "Roast Duck Breast",
    "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "offered",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36ee90",
    "name": "Fish Parmentier",
    "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "dessert",
    "price": 9.5
  },
  {
    "_id": "642c155b2c4774f05c36eeb0",
    "name": "Chicken and Walnut SouthIndian Specials",
    "recipe": "Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "soup",
    "price": 13.5
  },
  {
    "_id": "642c155b2c4774f05c36ee8d",
    "name": "Chicken and Walnut SouthIndian Specials",
    "recipe": "Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "dessert",
    "price": 13.5
  },
  {
    "_id": "642c155b2c4774f05c36ee8e",
    "name": "Escalope de Veau",
    "recipe": "Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "dessert",
    "price": 12.5
  },
  {
    "_id": "642c155b2c4774f05c36eea7",
    "name": "Fish Parmentier",
    "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "SouthIndian Specials",
    "price": 9.5
  },
  {
    "_id": "642c155b2c4774f05c36ee99",
    "name": "Goats Cheese SelfMade",
    "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SelfMade",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36eeb3",
    "name": "Fish Parmentier",
    "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "soup",
    "price": 9.5
  },
  {
    "_id": "642c155b2c4774f05c36eeb5",
    "name": "Fish Parmentier",
    "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "soup",
    "price": 9.5
  },
  {
    "_id": "642c155b2c4774f05c36eeb6",
    "name": "Haddock",
    "recipe": "Chargrilled fresh tuna steak (served medium rare) on classic Niçoise SouthIndian Specials with French beans.",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "soup",
    "price": 14.7
  },
  {
    "_id": "642c155b2c4774f05c36eeb8",
    "name": "Haddock",
    "recipe": "Chargrilled fresh tuna steak (served medium rare) on classic Niçoise SouthIndian Specials with French beans.",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "soup",
    "price": 14.7
  },
  {
    "_id": "642c155b2c4774f05c36ee7e",
    "name": "Fish Parmentier",
    "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "popular",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36ee8b",
    "name": "Chicken and Walnut SouthIndian Specials",
    "recipe": "Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "dessert",
    "price": 13.5
  },
  {
    "_id": "642c155b2c4774f05c36ee8f",
    "name": "Chicken and Walnut SouthIndian Specials",
    "recipe": "Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "dessert",
    "price": 13.5
  },
  {
    "_id": "642c155b2c4774f05c36ee91",
    "name": "Haddock",
    "recipe": "Chargrilled fresh tuna steak (served medium rare) on classic Niçoise SouthIndian Specials with French beans",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "dessert",
    "price": 14.7
  },
  {
    "_id": "642c155b2c4774f05c36ee97",
    "name": "Haddock",
    "recipe": "Chargrilled fresh tuna steak (served medium rare) on classic Niçoise SouthIndian Specials with French beans.",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "SelfMade",
    "price": 14.7
  },
  {
    "_id": "642c155b2c4774f05c36eea0",
    "name": "Roasted Pork Belly",
    "recipe": "Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "SelfMade",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36eea9",
    "name": "Fish Parmentier",
    "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SouthIndian Specials",
    "price": 9.5
  },
  {
    "_id": "642c155b2c4774f05c36ee85",
    "name": "Tuna Niçoise",
    "recipe": "Warm goats cheese and roasted vegetable SouthIndian Specials with black olive tapenade crostini",
    "image": "https://i.ibb.co/qJCmcpC/img2.png",
    "category": "dessert",
    "price": 10.5
  },
  {
    "_id": "642c155b2c4774f05c36ee93",
    "name": "Tuna Niçoise",
    "recipe": "Warm goats cheese and roasted vegetable SouthIndian Specials with black olive tapenade crostini",
    "image": "https://i.ibb.co/W5T6Gmj/img3.png",
    "category": "SelfMade",
    "price": 10.5
  },
  {
    "_id": "642c155b2c4774f05c36ee95",
    "name": "Chicken and Walnut SouthIndian Specials",
    "recipe": "Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SelfMade",
    "price": 13.5
  },
  {
    "_id": "642c155b2c4774f05c36ee9b",
    "name": "Goats Cheese SelfMade",
    "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SelfMade",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36eeb7",
    "name": "Fish Parmentier",
    "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
    "image": "/images/recipes/img1.png",
    "category": "soup",
    "price": 9.5
  },
  {
    "_id": "642c155b2c4774f05c36ee9c",
    "name": "Breton Fish Stew",
    "recipe": "Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SelfMade",
    "price": 12.9
  },
  {
    "_id": "642c155b2c4774f05c36ee9d",
    "name": "Goats Cheese SelfMade",
    "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    "image": "/images/recipes/img1.png",
    "category": "SelfMade",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36eeac",
    "name": "Roasted Pork Belly",
    "recipe": "Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SouthIndian Specials",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36eeb4",
    "name": "Haddock",
    "recipe": "Chargrilled fresh tuna steak (served medium rare) on classic Niçoise SouthIndian Specials with French beans.",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "soup",
    "price": 14.7
  },
  {
    "_id": "642c155b2c4774f05c36ee98",
    "name": "Breton Fish Stew",
    "recipe": "Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SelfMade",
    "price": 12.9
  },
  {
    "_id": "642c155b2c4774f05c36ee82",
    "name": "Escalope de Veau",
    "recipe": "Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "offered",
    "price": 12.5
  },
  {
    "_id": "642c155b2c4774f05c36ee86",
    "name": "Escalope de Veau",
    "recipe": "Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "dessert",
    "price": 12.5
  },
  {
    "_id": "642c155b2c4774f05c36ee9a",
    "name": "Breton Fish Stew",
    "recipe": "Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SelfMade",
    "price": 12.9
  },
  {
    "_id": "642c155b2c4774f05c36eeab",
    "name": "Goats Cheese SelfMade",
    "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "SouthIndian Specials",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36eeb1",
    "name": "Fish Parmentier",
    "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "soup",
    "price": 9.5
  },
  {
    "_id": "642c155b2c4774f05c36eead",
    "name": "Roast Duck Breast",
    "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    "image": "https://i.ibb.co/HCrDdk6/img1.png",
    "category": "soup",
    "price": 14.5
  },
  {
    "_id": "642c155b2c4774f05c36eeae",
    "name": "Tuna Niçoise",
    "recipe": "Warm goats cheese and roasted vegetable SouthIndian Specials with black olive tapenade crostini",
    "image": "/images/recipes/img1.png",
    "category": "soup",
    "price": 10.5
  } */
}
