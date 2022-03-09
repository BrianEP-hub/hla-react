import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdSense from 'react-adsense';
import CookieConsent from 'react-cookie-consent';
import { commerce } from "./lib/commerce";
import { NavBar, Footer, Products, Basket, Checkout, ProductView } from './components';


const App = () => {
    const [categories, setCategories] = useState([]);
    const [basketData, setBasketData] = useState({});
    const [orderInfo, setOrderInfo] = useState({});
    const [orderError, setOrderError] = useState("");

    const fetchProducts = async () => {
        const { data: products } = await commerce.products.list();
        const { data: categoriesData } = await commerce.categories.list();
        console.log({products})
        const productsPerCategory = categoriesData.reduce((acc, category) => {
            return[
                ...acc,
                {
                    ...category,
                    productsData: products.filter((product) => product.categories.find((cat) => cat.id === category.id)
                    ),
                },
            ];
        }, []);
        console.log({productsPerCategory})
        setCategories(productsPerCategory);
    };

    const fetchBasketData = async () => {
        const response = await commerce.cart.retrieve();
        setBasketData(response);
    };

    const addProduct = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);
        setBasketData(response.cart);
    };

    const RemoveItemFromBasket = async (itemId) => {
        const response = await commerce.cart.remove(itemId);
        setBasketData(response.cart);
    };

    const handleEmptyBasket = async () => {
        const response = await commerce.cart.empty();
        setBasketData(response.cart);
    };

    const updateProduct = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });
        setBasketData(response.cart);
    };

    const refreshBasket = async () => {
        const newBasketData = await commerce.cart.refresh();
        setBasketData(newBasketData);
    };

    const handleCheckout = async (checkoutId, orderData) => {
        try {
              const incomingOrder = await commerce.checkout.capture(
               checkoutId,
               orderData
             );

            setOrderInfo(orderData);

            refreshBasket();
        } catch (error) {
            setOrderError(
                (error.data && error.data.error && error.data.error.message) ||
                "There is an error occurred"
            );
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchBasketData();
    }, []);

    return (
        <Router>
            <div>
                <CssBaseline />
                <NavBar
                    basketItems={basketData.total_items}
                    totalCost={
                        (basketData.subtotal &&
                            basketData.subtotal.formatted_with_symbol) ||
                        "00.00"
                    }
                />
                <Switch>
                    <Route exact path="/">
                        <Products categories={categories} addProduct={addProduct} />
                    </Route>
                    <Route exact path="/basket">
                        <Basket
                            basketData={basketData}
                            updateProduct={updateProduct}
                            handleEmptyBasket={handleEmptyBasket}
                            RemoveItemFromBasket={RemoveItemFromBasket}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout
                            orderInfo={orderInfo}
                            orderError={orderError}
                            basketData={basketData}
                            handleCheckout={handleCheckout}
                        />
                    </Route>
                    <Route exact path="/product-view/:id">
                        <ProductView addProduct={addProduct}/>
                    </Route>
                </Switch>
                <AdSense.Google
                    client='ca-pub-7292810486004926'
                    slot='7806394673'
                    style={{display: 'block'}}
                    layout='in-article'
                    format='fluid'
                    />
               <CookieConsent
                 location="bottom"
                 buttonText="Sure man!!"
                 cookieName="myAwesomeCookieName2"
                 style={{ background: "#2B373B" }}
                 buttonStyle={{ color: "#4e503b", fontSize: "20px" }}
                 expires={150}
                >
                    This website uses cookies to enhance the user experience. </CookieConsent>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
