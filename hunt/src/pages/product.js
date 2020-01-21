import React from "react";

import { Text } from "react-native";

const Product = () => (
  <Text>Product</Text>
);

Product.navigationOptions = ({ navigation }) => {
  title: navigation.state.params.Product.title
}

export default Product;