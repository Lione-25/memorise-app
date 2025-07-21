import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import Pdf from "react-native-pdf";

export default function MemoriseScreen() {
  const [currentPage] = useState(2); // ← Change this to the page number you want (1-indexed)

  const onTickPress = () => {
    Alert.alert("✅ Page Completed", `You marked page ${currentPage} as done!`);
    // Optional: Save to AsyncStorage or backend
  };

  //   const source = require("../assets/almadinah-qadim.pdf");
  const source = { uri: "bundle-assets://almadinah-qadim.pdf" };
  //   const source = { uri: "bundle-assets://trial.pdf" };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        page={currentPage}
        style={styles.pdf}
        horizontal={true}
        enablePaging={true}
        trustAllCerts={true}
        onLoadComplete={(pages) => console.log(`Loaded ${pages} pages`)}
        // onError={(error) => console.error("PDF error:", error)}
        onError={(error) => {
          console.log("PDF failed to load:", JSON.stringify(error, null, 2));
        }}
        onLoadProgress={(percent) => console.log(`Progress: ${percent}`)}
      />
      <TouchableOpacity style={styles.button} onPress={onTickPress}>
        <Text style={styles.buttonText}>✅ Completed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
